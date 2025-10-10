import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function deleteProjectCategoryController(req: Request, res: Response){
    const { id } = req.params;

    try {
        // category to display
        const deletedProjectCategory = await prisma.projectCategory.findUnique({ where: { id: Number(id) }});
        
        // deleting indeed
        await prisma.projectCategory.delete({ where: { id: Number(id) }});

        // removing project category from projects
        await prisma.project.updateMany({
            where: {
                categoryId: Number(id)
            },
            data: {
                categoryId: null
            }
        });

        // success
        return res.status(200).json({
            status: "200 - Success",
            message: `Successfully deleted the project category with id '${id}'`,
            data: `Deleted: ${deletedProjectCategory}`
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