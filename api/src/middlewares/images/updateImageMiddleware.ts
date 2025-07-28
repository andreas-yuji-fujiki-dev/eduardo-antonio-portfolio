import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/prismaClient';

export default async function updateImageMiddleware(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  
  try {
    // Verifica se a imagem existe
    const imageExists = await prisma.image.findUnique({
      where: { id: Number(id) }
    });

    if (!imageExists) {
      return res.status(404).json({
        status: '404 - Not found',
        message: `Image with id ${id} does not exists`
      })
    }

    // Adiciona a imagem existente ao request para uso no controller
    req.existingImage = imageExists;
    next();
  } catch (error) {
    next(error);
  }
}