import { Request, Response, NextFunction } from "express";

export default function updateImageMiddleware(req:Request, res:Response, next:NextFunction){
    const { id } = req.params;
    const { name } = req.body;

    if( !id ) {
        return res.status(400).json({
            status: "400 - Bad request",
            message: "You must send image's id on request params."
        });
    };

    if( !name ){
        return res.status(400).json({
            status: "400 - Bad request",
            message: "You must send image's name to be updated."
        });
    };

    next();
};