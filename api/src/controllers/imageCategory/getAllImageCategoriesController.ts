import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getAllImageCategoriesController(req: Request, res: Response) {
    try {
        // get all
        const allImageCategories = await prisma.imageCategory.findMany()

        return res.status(200).json({
            status: "200 - Success",
            message: !!allImageCategories.length 
                ? "Successfully got all the stacks"
                : "No image categories found...",
            data: allImageCategories
        })

    } catch ( error: unknown ) {
        // in case of server internal error
         return res.status(500).json({
            status: "500 - Internal server error",
            error: "Something went wrong while fetching image categories.",
            details: error instanceof Error ? error.message : error
        });
    }
}