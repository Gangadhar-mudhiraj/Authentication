import { ErrorResponse } from "../Utils/ApiResponse.js";
import jwt from "jsonwebtoken"

const isAuthenticated = (req, res, next) => {
    const auth = req.headers["authorization"];


    if (!auth) {
        return res.status(401).json(new ErrorResponse(401, "unauthorised request"))
    }

    try {

        const decoded = jwt.verify(req.headers["authorization"], process.env.JWT_SECRET)

        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json(new ErrorResponse(401, "jwt incorrect or invalid"))
    }

}

export default isAuthenticated