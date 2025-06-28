import { Router } from "express";
import { signupValidation, loginValidation } from "../Middlewares/validation.js"
import { signup, login } from "../Controllers/Auth.controller.js";
import isAuthenticated from "../Middlewares/Auth.js"; const router = Router();
// import userModel from "../Models/User.js";
import { SuccessResponse } from "../Utils/ApiResponse.js";
router.post("/signup", signupValidation, signup)

router.post("/login", loginValidation, login)

router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    });

    res.status(200).json(new SuccessResponse({
        message: "Logged out successfully"
    }));
});


router.get("/me", isAuthenticated, async (req, res) => {
    try {
        const userData = {
            _id: req.user._id,
            email: req.user.email,
            name: req.user.name || "User",
        };

        const response = new SuccessResponse({
            message: "User fetched successfully",
            data: userData
        });

        // console.log("Sending:", response);
        res.status(response.statusCode).json(response); // ✅ Correct way
    } catch (err) {
        console.error("Error in /me:", err);
        res.status(500).json({
            success: false,
            message: "Server error while fetching user",
            error: err.message,
        });
    }
});

export default router;