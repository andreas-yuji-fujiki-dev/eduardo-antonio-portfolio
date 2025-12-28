import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

import validateId from "../../utils/validateId";
import validateString from "../../utils/validateString";

export default async function updateImageMiddleware(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { name, projectId, stackId, categoryId } = req.body;

  try {
    // validate image id
    const errorValidatingImageId = validateId('id', id, res);
    if( errorValidatingImageId ) return errorValidatingImageId;

    // verify if category exists
    const existingImage = await prisma.image.findUnique({ where: { id: Number(id) }});

    if(!existingImage) return res.status(404).json({
      status: "404 - Not found",
      message: `Image with id '${id}' does not exists`
    });

    // at least one field must be provided for PUT
    if(!name && !projectId && !stackId && !categoryId) return res.status(400).json({
      status: "400 - Bad request",
      message: "You must provide at least one field for edit (name, projectId, stackId, or categoryId)"
    })

    // validate name
    if( name ){
      const errorValidatingName = validateString('name', name, res);
      if( errorValidatingName ) return errorValidatingName;
    }

    // projectId validation
    if( projectId ) {
      const errorValidatingProjectId = validateId('projectId', projectId, res);
      if( errorValidatingProjectId ) return errorValidatingProjectId;
    }

    // stackId validation
    if( stackId ) {
      const errorValidatingStackId = validateId('stackId', stackId, res);
      if( errorValidatingStackId ) return errorValidatingStackId;
    }

    // categoryId validation
    if( categoryId ) {
      const errorValidatingCategoryId = validateId('categoryId', categoryId, res);
      if ( errorValidatingCategoryId ) return errorValidatingCategoryId;
    }

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
        message: `Image with id '${id}' does not exists`,
      });
    }

    // check existance of related entities only if provided
    if (projectId) {
      const projectExists = await prisma.project.findUnique({ where: { id: Number(projectId) }});

      if (!projectExists) return res.status(404).json({
          status: "404 - Not Found",
          message: `Project with id '${projectId}' does not exists`,
        })
    };

    if (stackId) {
      const stackExists = await prisma.stack.findUnique({ where: { id: Number(stackId) }});

      if (!stackExists) return res.status(404).json({
          status: "404 - Not Found",
          message: `Stack with id '${stackId}' does not exists`,
        })
    };

    if(categoryId) {
      const categoryExists = await prisma.imageCategory.findUnique({ where: { id: Number(categoryId) } });

      if(!categoryExists) return res.status(404).json({
        status: "404 - Not found",
        message: `Image category with id '${categoryId}' does not exists`
      })
    };

    (req as any).existingImage = imageExists;

    return next();
  } catch (error: any) {
    return res.status(500).json({
      status: "500 - Internal Server Error",
      error: "An unexpected error occurred",
      details: error?.message || String(error),
    })
  }
}
