import Router from "express";
import { SuccessResponse } from "../Utils/ApiResponse.js";
import isAuthenticated from "../Middlewares/Auth.js";

const router = Router();

const data = [
    { name: "mobile", price: 1000 },
    { name: "mobile", price: 1000 }
];

router.get("/", isAuthenticated, (req, res) => {
    res.status(201).json(
        new SuccessResponse({
            statusCode: 201,
            message: "products fetched",
            data: data
        })
    );
});

export default router;
