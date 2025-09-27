import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getAllImageCategoriesController(req: Request, res: Response) {
    try {
        // get all
        const allImageCategories = await prisma.imageCategory.findMany()

        return res.status(200).json({
            status: "200 - Success",
            message: "Successfully got all the stacks",
            data: !!allImageCategories.length ? allImageCategories : "No image categories found..."
        })

    } catch ( error ) {
        // in case of server internal error
         return res.status(500).json({
            status: "500 - Internal server error",
            message: "Something went wrong while fetching image categories.",
            error: error instanceof Error ? error.message : error
        });
    }
}