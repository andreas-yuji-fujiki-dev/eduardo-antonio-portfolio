import { Request, Response, NextFunction } from "express";

export default async function getImageCategoryByIdMiddleware(req: Request, res:Response, next:NextFunction){
    try {
        const { id } = req.params;
        
        // in case of wrong format or not given id
        if(!id || typeof(id) !== "number") return res.status(400).json({
            status: "400 - Bad request",
            message: "ID must be an valid integer number"
        });

    } catch (error) {
        // in case of server internal error
        res.status(500).json({
            status: "500 - Server internal error",
            message: "Something gone wrong",
            details: `The following error ocurred: ${error}`
        });
    };
};