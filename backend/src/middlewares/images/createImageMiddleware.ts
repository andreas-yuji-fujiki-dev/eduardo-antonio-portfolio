import { Request, Response, NextFunction } from "express";

export default function createImageMiddleware(req:Request, res:Response, next:NextFunction){
    const { name } = req.body;

    if( !name ){
        return res.status(400).json({
            status: "400 - Bad request",
            message: "You must send image's name"
        });
    };

    next();
};