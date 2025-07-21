import { Request, Response, NextFunction } from "express";

export default function deleteProjectMiddleware(req:Request, res:Response, next:NextFunction){
    const { id } = req.params;

    if( !id ){
        return res.status(400).json({
            status: "400 - Bad request",
            message: "Missing project's ID"
        })
    };

    next();
};