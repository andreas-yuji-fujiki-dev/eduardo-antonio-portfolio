import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

import validateId from "../../utils/validateId";

export default async function getProjectByIdMiddleware(req:Request, res:Response, next:NextFunction){
    try {
        const { id } = req.params;

        // id must exists
        const errorValidatingId = validateId('id', id, res);
        if( errorValidatingId ) return errorValidatingId;

        // verify if it exists
        const existingProject = await prisma.project.findUnique({ where: { id: Number(id) } })
        if(!existingProject) return res.status(404).json({
            status: "404 - Not found",
            message: `Cannot find the project with id '${id}'`
        });

        // success case
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