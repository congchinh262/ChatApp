import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const validateFields = (fields:string[])=>{
    const validationChecks = fields.map((field)=>check(field).not().isEmpty())
    return [
        ...validationChecks,
        (req:Request,res:Response,next:NextFunction)=>{
            const error = validationResult(req);
            if(!error.isEmpty()){
                return res.status(400).send({
                    success:false,
                    errorMessage:error.array()
                })
            }
            next();
        }
    ]
}