import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getAllProjectsCategoryController(req: Request, res: Response){
    try {
        // success case
        const allProjectCategories = await prisma.projectCategory.findMany();

        return res.status(200).json({
            status: "200 - Success",
            message: allProjectCategories.length > 0 
                ? "No project categories found..."
                :  "Successfuly got all project categories",
            data: allProjectCategories
        })
    } catch (error: unknown) {
        // internal server error
        return res.status(500).json({
            status: "500 - Server internal error",
            message: "An unexpected error ocurred while trying to get all project categories",
            details: error instanceof Error ? error.message : String(error)
        })
    }
}