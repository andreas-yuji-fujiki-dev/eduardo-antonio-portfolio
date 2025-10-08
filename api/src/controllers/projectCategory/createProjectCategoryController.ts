import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function createProjectCategoryController(req: Request, res:Response){
    const { name } = req.body;
    
    try {
        // creating
        const createdProjectCategory = await prisma.projectCategory.create({ data: { name } });
        
        // success
        return res.status(201).json({
            status: "201 - Created",
            message: `Successfuly created the '${name}' project category`,
            data: createdProjectCategory
        })
        
    } catch (error) {
        // internal server error
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        })
    }
}