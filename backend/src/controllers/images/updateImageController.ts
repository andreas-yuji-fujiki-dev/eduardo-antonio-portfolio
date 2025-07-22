import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function updateImageController(req:Request, res:Response){
    const { id } = req.params;
    const { name } = req.body;

    try {
        // verify if image exists
        const mentionedImage = await prisma.image.findUnique({ where: { id: Number(id) }});

        if( !mentionedImage ) {
            return res.status(404).json({
                status: "404 - Not found",
                message: `Project with id ${id} was not found...`
            });
        };

        // update
        const updatedProject = await prisma.image.update({
            where: { id: Number(id) },
            data: { name }
        });

        return res.status(200).json({
            status: "200 - Success",
            message: "Successfully edited the image",
            data: updatedProject
        });

    } catch ( error ) {
        // server internal error case
        res.status(500).json({
            status: "500 - Server internal error",
            message: "An unexpected error ocurred while updating the image",
            error: error
        });
    };
};