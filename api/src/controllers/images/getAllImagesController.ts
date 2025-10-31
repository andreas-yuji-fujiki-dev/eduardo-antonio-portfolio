import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getAllImagesController(req: Request, res: Response) {
    try {

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;
        const skip = (page - 1) * limit;

        // const totalImages = await prisma.image.count();  <--- deixei comentato porem, caso futuramente queira implementar no teu frontend um numerador de paginas.

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

        // success message
        return res.status(200).json({
            status: "200 - Success",
            message: "Successfully got all images",
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