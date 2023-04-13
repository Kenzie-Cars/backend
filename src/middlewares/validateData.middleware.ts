import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import { AppError } from "../errors";

const validateDataMiddleware = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const validateData = await schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true
        })
        req.body = validateData
        
        console.log(req.body);
        return next()
    } catch (error: any) {
        throw new AppError(error.errors, 400)
    }
}

export default validateDataMiddleware