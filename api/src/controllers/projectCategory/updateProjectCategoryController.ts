import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function updateProjectCategoryController(req: Request, res: Response){
    const { id } = req.params;
    const { name } = req.body;

    try {
        // updating
        const updatedProjectCategory = await prisma.projectCategory.update({ where: { id: Number(id) }, data: { name } });

        // success
        return res.status(200).json({
            status: "200 - Success",
            message: `Successfully updated the name of the project category with id ${id} to ${name}`,
            data: updatedProjectCategory
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