import { Request, Response, NextFunction } from "express";

export default async function getImageByIdMiddleware(req:Request, res:Response, next:NextFunction){
    const { id } = req.params;

    // id must exist
    if( !id || isNaN(Number(id)) ) {
        return res.status(400).json({
            status: "400 - Bad request",
            message: "You need to give an valid project's id on request params."
        });
    };

    // proceed
    next();
};