import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

import validateId from "../../utils/validateId";
import validateString from "../../utils/validateString";

export default async function updateStackCategoryMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        // validating fields
        const { id } = req.params;
        const { name } = req.body;

        const errorValidatingId = validateId('id', id, res);
        if( errorValidatingId ) return errorValidatingId;

        const errorValidatingName = validateString('name', name, res);
        if( errorValidatingName ) return errorValidatingName;

        // verify if stack category exists
        const existingStackCategoryFound = await prisma.stackCategory.findUnique({ where: { id: Number(id) } });
        
        if( !existingStackCategoryFound ) return res.status(404).json({
            status: "404 - Not found",
            message: `Cannot find stack category with id '${id}'`
        });

        // success case
        next()

    } catch (error) {
        // internal server error
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        })
    }
}