import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";
import { makeErrorResponse } from "../../utils/errorResponse";

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
        return res.status(200).json({
            status: "200 - Success",
            message: `Successfully got the image category with id '${id}'`,
            data: specificImageCategory
        })

    } catch (error: unknown) {
        // internal server error case
        const response = makeErrorResponse(error, "An unexpected error ocurred");
        return res.status(500).json(response);
    }
};