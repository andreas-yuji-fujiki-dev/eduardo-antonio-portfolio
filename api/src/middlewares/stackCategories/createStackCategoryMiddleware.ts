import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

import validateString from "../../utils/validateString";

export default async function createStackCategoryMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        // validate name
        const { name } = req.body;

        const errorValidatingName = validateString('name', name, res);
        if( errorValidatingName ) return errorValidatingName;

        // verify if some category already exists with this name
        const foundStackCategoryWithSameName = await prisma.stackCategory.findUnique({ where: { name } });

        if( foundStackCategoryWithSameName ) return res.status(409).json({
            status: "409 - Conflict",
            message: `Stack category with name '${name}' already exists`
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