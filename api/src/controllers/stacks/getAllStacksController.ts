import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getAllStacksController(req: Request, res: Response) {
    try {

        // pagination
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;
        const skip = (page - 1) * limit;

        // get all stacks
        const allStacks = await prisma.stack.findMany({
            skip,
            take: limit,
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

        // total number of existing stacks
        const totalStacks = await prisma.stack.count();

        return res.status(200).json({
            status: "200 - Success",
            message: "Successfully got all the stacks",
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalStacks / limit),
                totalItems: totalStacks,
                hasPrevPage: page > 1,
                hasNextPage: page * limit < totalStacks
            },
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
