import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";
import fs from 'fs';
import path from 'path';

export default async function deleteImageController(req: Request, res: Response) {
    const { id } = req.params;
    const imageToDelete = req.imageToDelete;

    try {
        // deleting register from database
        const deletedImage = await prisma.image.delete({
            where: { id: Number(id) }
        });

        // trying to delete the fisic file
        const imagePath = path.join('uploads', imageToDelete.name);
        
        fs.unlink(imagePath, (err) => {
            if (err && err.code !== 'ENOENT') { // ignores if file don't exist
                console.error('Error deleting image file:', err);
            }
        });

        // return data
        return res.status(200).json({
            status: 200,
            message: "Image deleted successfully",
            data: {
                id: deletedImage.id,
                name: deletedImage.name
            }
        });

    } catch (error) {
        console.error('Error deleting image:', error);
        
        return res.status(500).json({
            status: 500,
            message: "An unexpected error occurred while deleting the image",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}