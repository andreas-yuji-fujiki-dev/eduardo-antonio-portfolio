import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

import validateId from "../../utils/validateId";

export default async function getStackByIdMiddleware(req:Request, res:Response, next:NextFunction){
    try {
        const { id } = req.params;
    
        // id must be present
        const errorValidatingId = validateId('id', id, res);
        if( errorValidatingId ) return errorValidatingId;
    
        const existingStack = await prisma.stack.findUnique({ where: { id: Number(id)} });
        if(!existingStack) return res.status(404).json({
            status: "404 - Not found",
            message: `Cannot find a stack with id '${id}'`
        });

        // proceed
        next()

    } catch (error) {
        return res.status(500).json({
            status: "500 - Internal Server Error",
            error: "An unexpected error occurred",
            details: error?.message || String(error)
        })
    }
}