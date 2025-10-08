import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getStackCategoryByIdMiddleware(req: Request, res: Response, next: NextFunction){
    try {
        // validate id
        const { id } = req.params;

        if(!id || String(id).trim().length === 0) return res.status(400).json({
            status: "400 - Bad request",
            message: "You must provide a valid integer id on request params to search by id"
        });

        // verify if stack category exists
        const existingStackCategory = await prisma.stackCategory.findUnique({ where: { id: Number(id) }});

        if(!existingStackCategory) return res.status(404).json({
            status: "404 - Not found",
            message: `Cannot find stack category with id ${id}`
        })

        // success
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