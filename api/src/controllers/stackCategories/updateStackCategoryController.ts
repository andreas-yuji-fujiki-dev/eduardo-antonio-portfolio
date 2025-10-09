import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function updateStackCategoryController(req: Request, res: Response){
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedStackCategory = await prisma.stackCategory.update({ where: { id: Number(id) }, data: { name } });

        // success
        return res.status(200).json({
            status: "200 - Success",
            message: `Successfully edited the name of stack category with id '${id}' to '${name}'`,
            data: updatedStackCategory
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