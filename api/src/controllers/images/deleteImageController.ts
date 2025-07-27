import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function deleteImageController(req:Request, res:Response){
    const { id } = req.params;

    try {
        // verify if image exists
        const mentionedImage = await prisma.image.findUnique({ where: { id: Number(id) }});
        
        if( !mentionedImage ){
            return res.status(404).json({
                status: "404 - Not found",
                message: `Project with id ${id} was not found...`
            });
        };

        // deleting
        const deletedImage = await prisma.image.delete({
            where: { id: Number(id) }
        });

        return res.status(200).json({
            status: "200 - Success",
            message: "Successfully deleted the image",
            deleted_image: deletedImage
        });

    } catch ( error ) {
        // server internal error case
        return res.status(500).json({
            status: "500 - Internal server error",
            message: "An unexpected error has occurred while deleting the image",
            error: error
        });
    }
};