import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";
import { PaginationQuery } from "../../types/pagination";
import { makeErrorResponse } from "../../utils/errorResponse";

export default async function getAllImageCategoriesController(req: Request<{}, {}, {}, PaginationQuery>, res: Response) {
    try {

        // pagination
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;
        const skip = (page - 1) * limit;

        // get all
        const allImageCategories = await prisma.imageCategory.findMany({
            skip,
            take: limit,
            include: {
                images: true
            }
        });

      // total number of existing categories images
        const totalImagesCategories = await prisma.imageCategory.count();

        // success
        return res.status(200).json({
            status: "200 - Success",
            message: "Successfully got all image categories",
            pagination: {
                currentPage: page, limit,
                totalItems: totalImagesCategories,
                totalPages: Math.ceil( totalImagesCategories / limit ),
                hasPrevPage: page < 1,
                hasNextPage: (page * limit) < totalImagesCategories
                
            },
            data: !!allImageCategories.length 
                ? allImageCategories 
                : "No image categories found..."
        })

    } catch ( error: unknown ) {
        // server internal error
        const response = makeErrorResponse(error, "Something went wrong while fetching image categories");
        return res.status(500).json(response);
    }
}