import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function createStackController(req: Request, res: Response) {
    const { name, experience, logoId } = req.body;

    try {
        // verify if image exists
        const imageExists = await prisma.image.findUnique({
            where: { id: logoId },
        });

        if (!imageExists) {
            return res.status(404).json({
                status: "404 - Not Found",
                message: `Image with id ${logoId} does not exist.`,
            });
        }

        // create stack
        const newStack = await prisma.stack.create({
            data: {
                name,
                experience,
                logo: {
                    connect: { id: logoId },
                },
            },
            include: {
                logo: true,
            },
        });

        return res.status(201).json({
            status: "201 - Created",
            message: "Stack created successfully.",
            data: newStack,
        });

    } catch (error) {
        // in case of server internal error
        console.error("[createStackController]", error);
        return res.status(500).json({
            status: "500 - Internal Server Error",
            message: "An error occurred while creating the stack.",
            error,
        });
    }
}
