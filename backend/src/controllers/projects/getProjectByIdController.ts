import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getProjectByIdController(req: Request, res:Response){
    try {
        const { id } = req.params;

        const specificProject = await prisma.project.findUnique({
            where: {
                id: Number(id)
            }
        });

        return res.status(200).json({
            status: "200 - Success",
            data: specificProject ? specificProject : "Not found..."
        });
    } catch (error) {
        return res.status(500).json({
            status: "500 - Server internal error",
            message: error
        });
    }
};