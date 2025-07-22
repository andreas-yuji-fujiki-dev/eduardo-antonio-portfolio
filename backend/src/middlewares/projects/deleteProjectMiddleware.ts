import { Request, Response, NextFunction } from "express";

export default function deleteProjectMiddleware(req:Request, res:Response, next:NextFunction){
    const { id } = req.params;

    // id must exist
    if( !id || isNaN(Number(id)) ){
        return res.status(400).json({
            status: "400 - Bad request",
            message: "Missing a valid project's ID"
        })
    };
    
    // proceed
    next();
};