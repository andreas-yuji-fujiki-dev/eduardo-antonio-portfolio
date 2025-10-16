import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getAllProjectCategoriesController(req: Request, res: Response){
    try {
        // success case
        const allProjectCategories = await prisma.projectCategory.findMany();

        return res.status(200).json({
            status: "200 - Success",
            message: "Successfully got all the project categories",
            data: !allProjectCategories.length ? "No project categories found..." : allProjectCategories
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