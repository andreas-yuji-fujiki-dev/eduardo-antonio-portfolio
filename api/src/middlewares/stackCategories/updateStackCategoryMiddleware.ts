import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

export default async function updateStackCategoryMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        // validating fields
        const { id } = req.params;
        const { name } = req.body;

        if(!id || String(id).trim().length === 0) return res.status(400).json({
            status: "400 - Bad reuqest",
            message: "You must provide an valid id on request params"
        });

        if(!name || String(name).trim().length === 0) return res.status(400).json({
            status: "400 - Bad request",
            message: "You need to provide a name to update the stack category"
        });

        // verify if stack category exists
        const existingStackCategoryFound = await prisma.stackCategory.findUnique({ where: { id: Number(id) } });
        
        if(!existingStackCategoryFound) return res.status(404).json({
            status: "404 - Not found",
            message: `Cannot find stack category with id '${id}'`
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