import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

export default async function deleteStackCategoryController(req: Request, res: Response, next: NextFunction){
    try {
        // deleting
        const { id } = req.params;
        
        const deletedStackCategory = await prisma.stackCategory.delete({ where: { id: Number(id) }});

        // success
        return res.status(200).json({
            status: "200 - Success",
            message: `Successfuly deleted the stack category with id ${id}`,
            data: `Deleted: ${deletedStackCategory}`
        })

    } catch (error) {
        // internal server error
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        })
    }
}