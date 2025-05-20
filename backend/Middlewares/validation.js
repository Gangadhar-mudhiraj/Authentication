import Joi from "joi";
import { ErrorResponse } from "../Utils/ApiResponse.js";

const signupValidation = (req, res, next) => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
    })

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json(new ErrorResponse(400, "bad request", error))
    }

    next()
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({

        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
    })

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json(new ErrorResponse(400, "bad request", error))
    }

    next()
}

export { signupValidation, loginValidation }