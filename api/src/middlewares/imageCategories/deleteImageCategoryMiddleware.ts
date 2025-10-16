import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

import validateId from "../../utils/validateId";

export default async function deleteImageCategoryMiddleware(req: Request, res: Response, next: NextFunction){
    const { id } = req.params;

    try {
        
        // validating id
        const errorValidatingId = validateId('id', id, res);
        if ( errorValidatingId ) return errorValidatingId;

        // verify if image category exist
        const imageCategory = await prisma.imageCategory.findUnique({ where: { id: Number(id) } });
        
        if( !imageCategory ) return res.status(404).json({
            status: "404 - Not found",
            message: `Impossible to find image category with id '${id}'`
        });

        next()

    } catch (error) {
        
        // internal server error
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        })
    }
};