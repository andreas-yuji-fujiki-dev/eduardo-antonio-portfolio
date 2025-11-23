import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";
import { parse } from "path"; // import não ultilizado
import { PaginationQuery } from "../../types/pagination";

export default async function getAllStackCategoriesController(req: Request<{}, {}, {}, PaginationQuery>, res: Response){
    try {

        // pagination
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;
        const skip = ( page - 1 ) * limit;

        const allStackCategories = await prisma.stackCategory.findMany({ 
            skip,
            take: limit,
            include: { stacks: true } });

        // total number of existing categories
        const totalStackCategories = await prisma.stackCategory.count()

        // success 
        return res.status(200).json({
            status: "200 - Success",
            message: "Successfully got all the stack categories",
            pagination: {
                currentPage: page,
                totalPage: Math.ceil( totalStackCategories / limit ),
                totalItems: totalStackCategories,
                hasPrevPage: page > 1,
                hasNextPage : page * limit < totalStackCategories
            },
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

