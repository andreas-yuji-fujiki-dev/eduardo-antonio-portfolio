import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function createImageCategoryController(req: Request, res: Response){
    try {
        const { name } = req.body;

        // checking if a category with this name already exists
        const alreadyExists = 
            await prisma.imageCategory.findFirst({ where: { name } });
        
        if (alreadyExists) return res.status(409).json({
            status: "409 - Conflict",
            message: `An image category already exists with the name '${name}'.`
        });

        // creating
        const createdImageCategory = 
            await prisma.imageCategory.create({ data: { name } });

        return res.status(201).json({
            status: "200 - Created",
            message: `Successfuly created the image category '${name}'.`,
            data: createdImageCategory
        })

    } catch (error) {
        
        // internal server error
        return res.status(500).json({
            status: "500 - Internal server error",
            error: error?.message || String(error)
        })
    }
}