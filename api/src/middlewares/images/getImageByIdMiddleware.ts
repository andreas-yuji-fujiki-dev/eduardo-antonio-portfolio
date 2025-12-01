import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

import validateId from "../../utils/validateId";

export default async function getImageByIdMiddleware(req:Request, res:Response, next:NextFunction){
    try {
        const { id } = req.params;

        // id must exists
        const errorValidatingId = validateId('id', id, res);
        if( errorValidatingId ) return errorValidatingId;

        // image must exists
        const imageExists = await prisma.image.findUnique({ where: { id: Number(id) }}); // antes estava:  const imageExists = await prisma.project.findUnique({ where: { id: Number(id) }});
        if(!imageExists) return res.status(404).json({
            status: "404 - Not found",
            message: `The image with id '${id}' does not exists`
        });

        // proceed
        next()

    } catch (error) {
        // internal server error
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        })
    }
};