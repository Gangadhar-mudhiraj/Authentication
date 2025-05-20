import asyncHandler from "../Utils/AsyncHandler.js"
import { SuccessResponse, ErrorResponse } from "../Utils/ApiResponse.js"
import bcrypt from "bcrypt"
import userModel from "../Models/User.js"
import jwt from "jsonwebtoken"

const signup = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (!(name && email && password)) {
        return res.status(400).json(new ErrorResponse(400, "invalid data", []))
    }

    const user = await userModel.findOne({ email });

    if (user) {
        return res.status(400).json(new ErrorResponse(400, "user already exists", []))
    }

    const newUser = new userModel({ name, email, password })
    newUser.password = await bcrypt.hash(password, 10);

    await newUser.save();


    return res.status(201).json(new SuccessResponse(201, "signup success data", []))

})


const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!(email && password)) {
        return res.status(400).json(new ErrorResponse(400, "invalid data", []))
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(403).json(new ErrorResponse(400, "user not found", []))
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
        return res.status(403).json(new ErrorResponse(400, "incorrect password", []))
    }

    const jwtToken = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    )

    console.log(jwtToken);


    return res.status(200).json(new SuccessResponse({
        message: "Login successful",
        data: {
            token: jwtToken,
            email: user.email,
            name: user.name
        }
    }));


})

export { signup, login }