import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getProjectCategoryByIdController(req: Request, res: Response){
    const { id } = req.params;
    
    try {
        const foundProjectCategory = await prisma.projectCategory.findUnique({ where: { id: Number(id) } });
        
        return res.status(200).json({
            status: "200 - Success",
            message: `Successfuly got project category with id ${id}`,
            data: foundProjectCategory
        })
    } catch (error) {
        // internal server error case
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        })
    }
}