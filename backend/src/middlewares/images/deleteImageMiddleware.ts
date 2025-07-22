import { Request, Response, NextFunction } from "express";

export default function deleteImageMiddleware(req:Request, res:Response, next:NextFunction){
    const { id } = req.params;

    if( !id ) {
        return res.status(400).json({
            status: "400 - Bad request",
            message: "You must provide the image's id on request params"
        });
    };

    next();
};