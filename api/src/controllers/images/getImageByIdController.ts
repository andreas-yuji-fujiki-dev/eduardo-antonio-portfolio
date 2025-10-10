import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getImageByIdController(req:Request, res:Response){
    const { id } = req.params;

    try {
        // get image by id
        const specificImage = await prisma.image.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                name: true,
                stackLogo: true,
                category: true,
                project: true
            }
        });

        // if image does not exists
        if( !specificImage ){
            return res.status(404).json({
                status: "404 - Not found",
                message: `Project with id '${id}' was not found...`
            });
        };

        // success case
        return res.status(200).json({
            status: "200 - Success",
            data: specificImage
        });

    } catch ( error ) {
        // internal server error case
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        })
    };
};