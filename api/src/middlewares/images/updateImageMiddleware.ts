import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/prismaClient';

export default async function updateImageMiddleware(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { projectId, stackId } = req.body; 
  
  try {
    // verify if the image exists
    const imageExists = await prisma.image.findUnique({
      where: { id: Number(id) },
      include: {
        project: true,
        stackLogo: true
      }
    });

    if (!imageExists) {
      return res.status(404).json({
        status: '404 - Not found',
        message: `Image with id '${id}' does not exists`
      });
    }

    // verify if project exists (if projectId was provided)
    if (projectId) {
      const projectExists = await prisma.project.findUnique({
        where: { id: Number(projectId) }
      });
      
      if (!projectExists) {
        return res.status(404).json({
          status: '404 - Not found',
          message: `Project with id '${projectId}' does not exist`
        });
      }
    }

    // verify if stack exists (if stackId was provided)
    if (stackId) {
      const stackExists = await prisma.stack.findUnique({
        where: { id: Number(stackId) }
      });
      
      if (!stackExists) {
        return res.status(404).json({
          status: '404 - Not found',
          message: `Stack with id '${stackId}' does not exist`
        });
      }
    }

    req.existingImage = imageExists;
    next();
  } catch (error) {
    return res.status(500).json({
        status: "500 - Internal server error",
        error: "An unexpected error ocurred",
        details: error?.message || String(error)
    })
  }
}