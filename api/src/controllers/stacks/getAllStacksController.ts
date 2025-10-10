import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getAllStacksController(req: Request, res: Response) {
    try {
        // get all stacks
        const allStacks = await prisma.stack.findMany({
            include: {
                category: true,
                logo: true,
                projects: {
                    select: {
                        project: true
                    }
                }
            }
        });

        // remove categoryId and logoId from each stack
        const stacksWithoutIds = allStacks.map(({ categoryId, logoId, ...stack }) => stack);

        return res.status(200).json({
            status: "200 - Success",
            data: stacksWithoutIds.length ? stacksWithoutIds : "No stacks found..."
        });

    } catch (error) {
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        });
    }
}
