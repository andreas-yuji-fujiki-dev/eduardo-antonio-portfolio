import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getProjectByIdController(req: Request, res:Response){
    const { id } = req.params;

    try {
        // getting project by id
        const specificProject = await prisma.project.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                images: true,
                stacks: {
                    include: {
                        stack: true
                    }
                }
            }
        });

        // success or not found message
        return res.status(200).json({
            status: "200 - Success",
            data: specificProject ? specificProject : "Not found..."
        });

    } catch (error) {
        // in case of server intenal error
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        })
    }
};