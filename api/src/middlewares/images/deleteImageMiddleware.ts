import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

export default async function deleteImageMiddleware(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    // Validação do ID
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({
            status: 400,
            message: "You must provide a valid image's id on request params"
        });
    }

    try {
        // Verifica se a imagem existe
        const image = await prisma.image.findUnique({ 
            where: { id: Number(id) }
        });

        if (!image) {
            return res.status(404).json({
                status: 404,
                message: `Image with id ${id} was not found`
            });
        }

        // Adiciona a imagem ao request para uso no controller
        req.imageToDelete = image;
        next();
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error while verifying image existence",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}