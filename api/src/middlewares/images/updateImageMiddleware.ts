import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

export default async function updateImageMiddleware(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const { projectId, stackId, categoryId } = req.body;

  try {
    // validate image id
    if (!id || isNaN(Number(id))) {
      return res.status(400).json({
        status: "400 - Bad Request",
        message: "You must provide a valid numeric 'id' in request params"
      })
    };

    // verify if category exists
    const existingImageCategory = await prisma.imageCategory.findUnique({ where: { id: Number(id) }});

    if(!existingImageCategory) return res.status(404).json({
      status: "404 - Not found",
      message: `Image category with id '${id}' does not exists`
    });

    // helper to validate optional IDs
    const validateId = (value: any) =>
      value !== undefined && value !== null && (!String(value).trim().length || isNaN(Number(value)));

    if (validateId(projectId)) {
      return res.status(400).json({
        status: "400 - Bad Request",
        message: "'projectId' must be a valid integer number"
      });
    }

    if (validateId(stackId)) {
      return res.status(400).json({
        status: "400 - Bad Request",
        message: "'stackId' must be a valid integer number"
      });
    }

    if (validateId(categoryId)) {
      return res.status(400).json({
        status: "400 - Bad request",
        message: "'categoryId' must be a valid integer number"
      })
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
