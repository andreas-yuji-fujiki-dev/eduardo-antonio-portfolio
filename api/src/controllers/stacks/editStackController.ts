import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function editStackController(req: Request, res: Response) {
    const { id } = req.params;
    const { name, experience, logoId, categoryId, projectIds } = req.body;

    try {
        const stackId = Number(id);

        // update stack fields (excluding projects)
        await prisma.stack.update({
            where: { id: stackId },
            data: {
                ...(name !== undefined && { name }),
                ...(experience !== undefined && { experience }),
                ...(logoId !== undefined && { logo: { connect: { id: Number(logoId) } } }),
                ...(categoryId !== undefined && { category: { connect: { id: Number(categoryId) } } }),
            },
        });

        // connect projects if provided
        if (projectIds !== undefined && projectIds.length > 0) {
            const existingRelations = await prisma.projectStack.findMany({
                where: {
                    stackId,
                    projectId: { in: projectIds.map(Number) },
                },
                select: { projectId: true },
            });

            const newRelations = projectIds
                .map(Number)
                .filter(pid => !existingRelations.some(r => r.projectId === pid))
                .map(pid => ({ projectId: pid, stackId }));

            if (newRelations.length > 0) {
                await prisma.projectStack.createMany({ data: newRelations });
            }
        }

        // fetch the updated stack including all related data
        const updatedStack = await prisma.stack.findUnique({
            where: { id: stackId },
            include: {
                logo: true,
                category: true,
                projects: true
            },
        });

        // remove unnecessary fields
        const { categoryId: _categoryId, logoId: _logoId, ...stackWithoutIds } = updatedStack;

        return res.status(200).json({
            status: "200 - Success",
            message: `Stack with id '${id}' updated successfully`,
            data: stackWithoutIds,
        });

    } catch (error) {
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error occurred",
            details: error?.message || String(error),
        });
    }
}
