import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function createStackController(req: Request, res: Response) {
    const { name, experience, logoId } = req.body;

    try {
        // verify if a stack already exists with the given name
        const existingStackWithSameName = await prisma.stack.findUnique({ where: { name: String(name) } });

        if (existingStackWithSameName) return res.status(409).json({
            status: "409 - Conflict",
            message: `A stack already exists with the name '${name}'`
        });

        // verify if image exists (if logoId was provided)
        const imageExists = logoId && await prisma.image.findUnique({ where: { id: logoId } });

        if (logoId && !imageExists) {
            return res.status(404).json({
                status: "404 - Not Found",
                message: `Image with id '${logoId}' does not exist`,
            });
        };

        // create stack
        const newStack = await prisma.stack.create({
            data: {
                name,
                experience,
                ...(logoId !== undefined && { logo: { connect: { id: logoId } } }),
            },
            include: { 
                category: true, 
                logo: true,
                projects: true 
            }
        });

        // remove categoryId and logoId from response
        const { categoryId, logoId: _logoId, ...stackWithoutIds } = newStack;

        return res.status(201).json({
            status: "201 - Created",
            message: "Stack created successfully",
            data: stackWithoutIds
        });

    } catch (error) {
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        });
    }
}
