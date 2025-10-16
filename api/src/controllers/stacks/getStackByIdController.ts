import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getStackByIdController(req: Request, res: Response) {
    const { id } = req.params;

    try {
        // getting specific stack by id
        const specificStack = await prisma.stack.findUnique({ 
            where: { id: Number(id) },
            include: { 
                logo: true, 
                category: true,
                projects: {
                    select: {
                        project: true,
                    }
                }
            }
        });
        
        if (!specificStack) {
            return res.status(404).json({
                status: "404 - Not found",
                message: `Cannot find stack with id '${id}'`
            })
        };

        // remove categoryId and logoId from response
        const { categoryId, logoId, ...stackWithoutIds } = specificStack;

        return res.status(200).json({
            status: "200 - Success",
            message: `Successfully got the stack with id '${id}'`,
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
