import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";
import { makeErrorResponse } from "../../utils/errorResponse";

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

        // success case
        return res.status(200).json({
            status: "200 - Success",
            message: `Successfully got the image with id '${id}'`,
            data: specificImage
        });

    } catch ( error: unknown ) {
        // internal server error case
        const response = makeErrorResponse(error, "An unexpected error ocurred")
        return res.status(500).json(response)
    };
};