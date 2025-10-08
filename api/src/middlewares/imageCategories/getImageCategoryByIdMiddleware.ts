import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getImageCategoryByIdMiddleware(req: Request, res:Response, next:NextFunction){
    try {
        const { id } = req.params;
        
        // in case of wrong format or not given id
        if(!id || typeof(Number(id)) !== "number") return res.status(400).json({
            status: "400 - Bad request",
            message: "ID must be an valid integer number"
        });

        // verify if exists
        const foundImageCategory = await prisma.imageCategory.findUnique({ where: { id: Number(id) }});
        
        if(!foundImageCategory) return res.status(404).json({
            status: "404 - Not found",
            message: `Cannot find image category with id ${id}`
        });

        // in success case
        next()

    } catch (error) {
        // in case of server internal error
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        })
    };
};