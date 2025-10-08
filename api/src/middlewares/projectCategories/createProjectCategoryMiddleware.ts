import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

export default async function createProjectCategoryMiddleware(req: Request, res: Response, next: NextFunction){
    const { name } = req.body;

    try {
        // validate name
        if(!name || typeof(String(name)) !== 'string') return res.status(400).json({
            status: "400 - Bad request",
            message: "You must provide an 'name' on request body as a valid string." 
        });

        // verify if some project category already have the same name
        const foundProjectCategoryWithSameName = await prisma.projectCategory.findFirst({ where: name });
        
        if(foundProjectCategoryWithSameName) return res.status(409).json({
            status: "409 - Conflict",
            message: `An project category already exists with the name ${name}, please choose another name`
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