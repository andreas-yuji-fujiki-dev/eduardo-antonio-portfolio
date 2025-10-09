import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function deleteStackController(req: Request, res: Response) {
    const { id } = req.params;

    try {

        // verify if stack exists
        const stackExists = await prisma.stack.findUnique({ where: { id: Number(id) }});

        if ( !stackExists ) {
            return res.status(404).json({
                status: "404 - Not Found",
                message: `Stack with id '${id}' does not exist`,
            });
        }

        // deleting stack
        await prisma.stack.delete({ where: { id: Number(id) }});

        return res.status(200).json({
            status: "200 - Success",
            message: `Stack with id '${id}' deleted successfully`,
        });

    } catch (error) {
        // in case of server internal error
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        })
    };
};
