import jwt from "jsonwebtoken";
import { ErrorResponse } from "../Utils/ApiResponse.js";

const isAuthenticated = (req, res, next) => {
    const token = req.cookies?.token; // ✅ FROM COOKIE

    // console.log("token", token);

    if (!token) {
        return res.status(401).json(new ErrorResponse(401, "Unauthorized request"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json(new ErrorResponse(401, "JWT invalid or expired"));
    }
};

export default isAuthenticated;
