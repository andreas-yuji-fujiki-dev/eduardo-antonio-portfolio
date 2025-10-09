import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getAllStackCategoriesController(req: Request, res: Response){
    try {
        const allStackCategories = await prisma.stackCategory.findMany();

        // success 
        return res.status(200).json({
            status: "200 - Success",
            message: !!allStackCategories.length
                ? "Successfully got all stack categories"
                : "No stack categories found...",
            data: allStackCategories
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

