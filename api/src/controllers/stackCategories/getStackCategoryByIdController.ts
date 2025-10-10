import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getStackCategoryByIdController(req: Request, res: Response){
    try {
        const { id } = req.params;

        const foundStackCategory = await prisma.stackCategory.findUnique({ 
            where: { id: Number(id) },
            include: {
                stacks: true
            } 
        });

        return res.status(200).json({
            status: "200 - Success",
            message: `Successfuly found stack category with id '${id}'`,
            data: foundStackCategory
        });
        
    } catch (error) {
        // internal server error
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        })
    }
} 