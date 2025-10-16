import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

import validateId from "../../utils/validateId";
import validateString from "../../utils/validateString";

export default async function updateProjectCategoryMiddleware(req: Request, res: Response, next: NextFunction){
    const { id } = req.params;
    const { name } = req.body;
    
    try {
        // validating id
        const errorValidatingId = validateId('id', id, res);
        if( errorValidatingId ) return errorValidatingId;

        // validating name from body
        const errorValidatingName = validateString('name', name, res);
        if( errorValidatingName ) return errorValidatingName;

        // verify if project category exists
        const foundProjectCategory = await prisma.projectCategory.findUnique({ where: { id: Number(id) } });

        if( !foundProjectCategory ) return res.status(400).json({
            status: "400 - Bad request",
            message: `Cannot find project category with id '${id}'`
        });

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