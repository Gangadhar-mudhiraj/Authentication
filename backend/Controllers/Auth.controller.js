import asyncHandler from "../Utils/AsyncHandler.js";
import { SuccessResponse, ErrorResponse } from "../Utils/ApiResponse.js";
import bcrypt from "bcrypt";
import userModel from "../Models/User.js";
import jwt from "jsonwebtoken";

const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!(name && email && password)) {
        return res.status(400).json(new ErrorResponse({
            statusCode: 400,
            message: "Invalid data",
            error: "All fields (name, email, password) are required"
        }));
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
        return res.status(400).json(new ErrorResponse({
            statusCode: 400,
            message: "User already exists",
            error: "Email already registered"
        }));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
        name,
        email,
        password: hashedPassword
    });

    await newUser.save();

    return res.status(201).json(new SuccessResponse({
        statusCode: 201,
        message: "Signup successful",
        data: {
            name: newUser.name,
            email: newUser.email
        }
    }));
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!(email && password)) {
        return res.status(400).json(new ErrorResponse({
            statusCode: 400,
            message: "Invalid data",
            error: "Email and password are required"
        }));
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(403).json(new ErrorResponse({
            statusCode: 403,
            message: "User not found",
            error: "No user registered with this email"
        }));
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
        return res.status(403).json(new ErrorResponse({
            statusCode: 403,
            message: "Incorrect password",
            error: "The password you entered is incorrect"
        }));
    }

    const jwtToken = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );

    return res.status(200).json(new SuccessResponse({
        message: "Login successful",
        data: {
            token: jwtToken,
            email: user.email,
            name: user.name
        }
    }));
});

export { signup, login };
