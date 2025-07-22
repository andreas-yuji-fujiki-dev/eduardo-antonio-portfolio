import { Request, Response, NextFunction } from "express";

export default function createImageMiddleware(req:Request, res:Response, next:NextFunction){
    const { name } = req.body;

    // name must exist
    if( !name || typeof name !== "string" ){
        return res.status(400).json({
            status: "400 - Bad request",
            message: "You must send image's name in string format"
        });
    };

    // proceed
    next();
};