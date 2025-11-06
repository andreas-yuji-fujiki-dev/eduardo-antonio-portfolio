import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getAllImagesController(req: Request, res: Response) {
    try {
        
        // pagination
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;
        const skip = (page - 1) * limit;

        // get all images
        const allImages = await prisma.image.findMany({
            skip,
            take: limit,
            select: {
                id: true,
                name: true,
                category: true,
                project: true,
                stackLogo: true
            }
        });

        // number of total exinsting images
        const totalImages = await prisma.image.count()

        // success message
        return res.status(200).json({
            status: "200 - Success",
            message: "Successfully got all images",
            pagination: {
                currentPage: page, limit,
                totalPages: Math.ceil( totalImages / limit ),
                totalItems: totalImages,
                hasPrevPage: page > 1,
                hasNextPage: (page * limit) < totalImages               
            },
            data: !!allImages.length ? allImages : "No images found..."
        });

    } catch (error) {
        // server internal error case
        return res.status(500).json({
            status: "500 - Server internal error",
            error: "An error occurred while trying to list all images",
            details: error?.message || String(error)
        });
    }
};