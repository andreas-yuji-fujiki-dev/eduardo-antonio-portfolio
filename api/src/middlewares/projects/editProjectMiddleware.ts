import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

import validateId from "../../utils/validateId";
import validateString from "../../utils/validateString";
import validateNumberArray from "../../utils/validateNumbersArray";

export default async function   editProjectMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const { 
      name,
      description, 
      more_info,
      deploy_link,
      repository_link,
      imageIds,
      stackIds,
      categoryId
    } = req.body;

    // validate project id
    const errorValidatingProjectId = validateId('id', id, res);
    if (errorValidatingProjectId) return errorValidatingProjectId;

    // check if project exists
    const project = await prisma.project.findUnique({
      where: { id: Number(id) },
      include: { category: true }
    });

    if (!project) {
      return res.status(404).json({
        status: "404 - Not Found",
        message: "Project not found",
      });
    }

    // validate strings
    if (name) {
      const error = validateString('name', name, res);
      if (error) return error;

      // avoid name conflict
      const nameConflict = await prisma.project.findUnique({ where: { name } });
      if(nameConflict) return res.status(409).json({
        status: "409 - Conflict",
        message: `A project already exists with the name '${name}'`
      });
    }

    if (description) {
      const error = validateString('description', description, res);
      if (error) return error
    };

    if (more_info) {
      const error = validateString('more_info', more_info, res);
      if (error) return error
    };

    if (deploy_link) {
      const error = validateString('deploy_link', deploy_link, res);
      if (error) return error
    };

    if (repository_link) {
      const error = validateString('repository_link', repository_link, res);
      if (error) return error
    };

    // validate arrays
    if (Array.isArray(imageIds)) {
      const error = validateNumberArray('imageIds', imageIds, res);
      if (error) return error
    };

    if (Array.isArray(stackIds)) {
      const error = validateNumberArray('stackIds', stackIds, res);
      if (error) return error
    };

    // validate category id
    if (categoryId) {
      const error = validateId('categoryId', categoryId, res);
      if (error) return error;

      const categoryExists = await prisma.projectCategory.findUnique({ where: { id: Number(categoryId) }});

      if (!categoryExists) return res.status(404).json({
          status: "404 - Not Found",
          message: `Project category with id '${categoryId}' not found`,
        })
    };

    // attach project to request
    (req as any).project = project;

    next()

  } catch (error) {
    // internal server error
    return res.status(500).json({
      status: "500 - Internal server error",
      error: "An unexpected error ocurred",
      details: error?.message || String(error)
    })
  }
}