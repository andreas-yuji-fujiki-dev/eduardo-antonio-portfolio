import { Request, Response, NextFunction } from "express";

export default function updateImageMiddleware(req:Request, res:Response, next:NextFunction){
    const { id } = req.params;
    const { name } = req.body;

    // id must exist
    if( !id || isNaN(Number(id)) ) {
        return res.status(400).json({
            status: "400 - Bad request",
            message: "You must send a valid image's id on request params."
        });
    };

    // image's name must exist
    if( !name || typeof name !== "string" ) {
        return res.status(400).json({
            status: "400 - Bad request",
            message: "You must send image's name in string format to be updated."
        });
    };

    // proceed
    next();
};