import { Request, Response, NextFunction } from "express";

export default async function getImageByIdMiddleware(req:Request, res:Response, next:NextFunction){
    const { id } = req.params;

    if( !id ) {
        return res.status(400).json({
            status: "400 - Bad request",
            message: "You need to give project's id on request params."
        });
    };

    next();
};