import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getAllImagesController(req: Request, res: Response) {
    try {
        // get all images
        const allImages = await prisma.image.findMany({
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