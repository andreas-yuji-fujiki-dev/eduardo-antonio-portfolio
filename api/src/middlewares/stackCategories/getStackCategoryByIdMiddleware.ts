import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

import validateId from "../../utils/validateId";

export default async function getStackCategoryByIdMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        // validate id
        const { id } = req.params;

        const errorValidatingId = validateId('id', id, res);
        if( errorValidatingId ) return errorValidatingId;

        // verify if stack category exists
        const existingStackCategory = await prisma.stackCategory.findUnique({ where: { id: Number(id) }});

        if(!existingStackCategory) return res.status(404).json({
            status: "404 - Not found",
            message: `Cannot find stack category with id '${id}'`
        })

        // success
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