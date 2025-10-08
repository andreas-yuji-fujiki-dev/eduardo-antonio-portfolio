import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getStackByIdController(req:Request, res:Response){
    const { id } = req.params;

    try {
        // getting specific project by id
        const specificStack = await prisma.stack.findUnique({ where: { id: Number(id) }});
        if( !specificStack ){
            return res.status(404).json({
                status: "404 - Not found",
                message: `Cannot find stack with id ${id}`
            });
        };

        return res.status(200).json({
            status: "200 - Success",
            data: specificStack
        });

    } catch (error) {
        // in case of server internal error
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error ocurred",
            details: error?.message || String(error)
        })
    }
};