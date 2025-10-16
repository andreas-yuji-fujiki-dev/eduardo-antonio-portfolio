import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

import validateId from "../../utils/validateId";

export default async function getImageCategoryByIdMiddleware(req: Request, res:Response, next:NextFunction){
    try {
        const { id } = req.params;
        
        // in case of wrong format or not given id
        const erroValidatingId = validateId('id', id, res);
        if( erroValidatingId ) return erroValidatingId;

        // verify if exists
        const foundImageCategory = await prisma.imageCategory.findUnique({ where: { id: Number(id) }});
        
        if(!foundImageCategory) return res.status(404).json({
            status: "404 - Not found",
            message: `Cannot find image category with id '${id}'`
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