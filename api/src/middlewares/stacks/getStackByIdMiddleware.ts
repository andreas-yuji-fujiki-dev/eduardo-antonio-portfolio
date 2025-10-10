import { Request, Response, NextFunction } from "express";

export default function getStackByIdMiddleware(req:Request, res:Response, next:NextFunction){
    const { id } = req.params;

    // id must be present
    if( !id || isNaN(Number(id)) ) {
        return res.status(400).json({
            status: "400 - Bad request",
            message: "You need to provide project's id to search by id"
        })
    };

    // proceed
    next();
};