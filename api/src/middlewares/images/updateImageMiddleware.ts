import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/prismaClient';

export default async function updateImageMiddleware(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  
  try {
    // verify if image exists
    const imageExists = await prisma.image.findUnique({
      where: { id: Number(id) }
    });

    if (!imageExists) {
      return res.status(404).json({
        status: '404 - Not found',
        message: `Image with id ${id} does not exists`
      })
    }

    // adding image into request, it will be used on controller
    req.existingImage = imageExists;
    next();
  } catch (error) {
    next(error);
  }
}