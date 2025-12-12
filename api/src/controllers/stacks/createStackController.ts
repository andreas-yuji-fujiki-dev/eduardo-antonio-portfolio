import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function createStackController(req: Request, res: Response) {
    const { name, experience, logoId } = req.body;

    try {
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

        // success message
        return res.status(201).json({
            status: "201 - Created",
            message: "Stack created successfully",
            data: stackWithoutIds
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
