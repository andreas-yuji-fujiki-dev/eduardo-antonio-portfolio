import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getAllStackCategoriesController(req: Request, res: Response){
    try {
        const allStackCategories = await prisma.stackCategory.findMany({ include: { stacks: true } });

        // success 
        return res.status(200).json({
            status: "200 - Success",
            message: "Successfully got all the stack categories",
            data: !!allStackCategories.length ? allStackCategories : "No stack categories found..."
        })

    } catch (error) {
        return res.status(500).json({
            // internal server error
            status: "500 - Server internal error",
            error: "An error occurred while trying to list all stack categories",
            details: error?.message || String(error)
        });
    }
}

