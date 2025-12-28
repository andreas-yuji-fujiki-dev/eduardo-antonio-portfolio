import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";
import { PaginationQuery } from "../../types/pagination";

export default async function getAllProjectCategoriesController(req: Request<{}, {}, {}, PaginationQuery >, res: Response){
    try {

        // pagination
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;
        const skip = (page - 1) * limit;

        const allProjectCategories = await prisma.projectCategory.findMany({
            skip,
            take: limit,
            include: { projects: true }
        })

        // total number of existing categories projects
        const totalProjectCategories = await prisma.projectCategory.count()
        
        // success case
        return res.status(200).json({
            status: "200 - Success",
            message: "Successfully got all the project categories",
            pagination: {
                currentPage: page, limit,
                totalItens: totalProjectCategories,
                totalPages: Math.ceil( totalProjectCategories / limit ),
                hasPrevPage: page > 1,
                hasNextPage: page * limit < totalProjectCategories
            },
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