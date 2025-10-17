import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

import validateId from "../../utils/validateId";

export default async function deleteImageMiddleware(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    // id validation
    const errorValidatingId = validateId('id', id, res);
    if( errorValidatingId ) return errorValidatingId;

    try {
        // verifying if image exists
        const image = await prisma.image.findUnique({ where: { id: Number(id) }});

        if (!image) {
            return res.status(404).json({
                status: "404 - Not found",
                message: `Image with id '${id}' was not found`
            })
        };

        // adding image into request to use it on controller
        req.imageToDelete = image;
        next()

    } catch (error) {

        // internal server error
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        })
    }
}