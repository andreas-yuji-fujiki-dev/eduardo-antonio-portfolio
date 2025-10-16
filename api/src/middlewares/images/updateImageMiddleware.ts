import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

import validateId from "../../utils/validateId";

export default async function updateImageMiddleware(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { projectId, stackId, categoryId } = req.body;

  try {
    // validate image id
    const errorValidatingImageId = validateId('id', id, res);
    if( errorValidatingImageId ) return errorValidatingImageId;

    // verify if category exists
    const existingImageCategory = await prisma.imageCategory.findUnique({ where: { id: Number(id) }});

    if(!existingImageCategory) return res.status(404).json({
      status: "404 - Not found",
      message: `Image category with id '${id}' does not exists`
    });

    // projectId validation
    const errorValidatingProjectId = validateId('projectId', projectId, res);
    if( errorValidatingProjectId ) return errorValidatingProjectId;

    // stackId validation
    const errorValidatingStackId = validateId('stackId', stackId, res);
    if( errorValidatingStackId ) return errorValidatingStackId;

    // categoryId validation
    const errorValidatingCategoryId = validateId('categoryId', categoryId, res);
    if ( errorValidatingCategoryId ) return errorValidatingCategoryId;

    // check if image exists
    const imageExists = await prisma.image.findUnique({
      where: { id: Number(id) },
      include: {
        project: true,
        stackLogo: true,
      },
    });

    if (!imageExists) {
      return res.status(404).json({
        status: "404 - Not Found",
        message: `Image with id '${id}' does not exist`,
      });
    }

    // check related entities only if provided
    if (projectId) {
      const projectExists = await prisma.project.findUnique({
        where: { id: Number(projectId) },
      });

      if (!projectExists) {
        return res.status(404).json({
          status: "404 - Not Found",
          message: `Project with id '${projectId}' does not exist`,
        });
      }
    }

    if (stackId) {
      const stackExists = await prisma.stack.findUnique({
        where: { id: Number(stackId) },
      });

      if (!stackExists) {
        return res.status(404).json({
          status: "404 - Not Found",
          message: `Stack with id '${stackId}' does not exist`,
        });
      }
    }

    (req as any).existingImage = imageExists;
    return next();

  } catch (error: any) {
    return res.status(500).json({
      status: "500 - Internal Server Error",
      error: "An unexpected error occurred",
      details: error?.message || String(error),
    });
  }
}
