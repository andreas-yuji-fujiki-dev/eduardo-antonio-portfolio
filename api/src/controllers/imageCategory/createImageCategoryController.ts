import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function createImageCategoryController(req: Request, res: Response){
    try {
        const { name } = req.body;

        // creating
        const createdImageCategory = 
            await prisma.imageCategory.create({ data: { name } });

        // success
        return res.status(201).json({
            status: "201 - Created",
            message: `Successfully created the image category '${name}'`,
            data: createdImageCategory
        })

    } catch (error) {
        // internal server error
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "Something went wrong",
            details: error?.message || String(error)
        })
    }
}