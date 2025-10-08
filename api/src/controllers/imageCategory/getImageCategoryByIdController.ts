import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getImageCategoryByIdController( req: Request, res: Response ){
    try {
        // given id
        const { id } = req.params;

        // get specific image category
        const specificImageCategory = await prisma.imageCategory.findUnique({
            where: { id: Number(id) },
            select: {
                id: true,
                name: true,
                images: true
            }
        });

        // success case
        res.status(200).json({
            status: "200 - Success",
            message: `Successfuly got the image category with id ${id}`,
            data: specificImageCategory
        })

    } catch (error) {
        // internal server error case
        res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        })
    }
};