import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function editStackController(req: Request, res: Response) {
    const { id } = req.params;
    const { name, experience, logoId, categoryId } = req.body;

    try {
        // verify if stack exists
        const existingStack = await prisma.stack.findUnique({
            where: { id: Number(id) },
        });

        if (!existingStack) {
            return res.status(404).json({
                status: "404 - Not Found",
                message: `Stack with id '${id}' does not exist`,
            });
        }

        // verify if logo exists
        if (logoId !== undefined) {
            const imageExists = await prisma.image.findUnique({ where: { id: logoId } });

            if (!imageExists) {
                return res.status(404).json({
                    status: "404 - Not Found",
                    message: `Image with id '${logoId}' does not exist`,
                });
            }
        }

        // verify if category exists
        if (categoryId !== undefined && categoryId !== null) {
            const categoryExists = await prisma.stackCategory.findUnique({
                where: { id: Number(categoryId) },
            });

            if (!categoryExists) {
                return res.status(404).json({
                    status: "404 - Not Found",
                    message: `Stack category with id '${categoryId}' does not exist`,
                });
            }
        }

        // update stack
        const updatedStack = await prisma.stack.update({
            where: { id: Number(id) },
            data: {
                ...(name !== undefined && { name }),
                ...(experience !== undefined && { experience }),
                ...(logoId !== undefined && { logo: { connect: { id: logoId } } }),
                ...(categoryId !== undefined && {
                category: categoryId === null
                    ? { disconnect: true } // remove relation
                    : { connect: { id: Number(categoryId) } } // connect
                }),
            },
            include: {
                logo: true,
                category: true,
            },
        });

        return res.status(200).json({
            status: "200 - Success",
            message: "Stack updated successfully",
            data: updatedStack,
        });

    } catch (error) {
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error occurred",
            details: error?.message || String(error),
        });
    }
}
