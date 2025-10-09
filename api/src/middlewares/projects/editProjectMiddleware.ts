import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

export default async function editProjectMiddleware(req: Request, res: Response, next: NextFunction) {
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

  // project's id validation
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({
      status: "400 - Bad Request",
      message: "Project ID must be a valid number",
    })
  };

  // validation: at least one field must be present
  if (
    name === undefined &&
    description === undefined &&
    more_info === undefined &&
    deploy_link === undefined &&
    repository_link === undefined &&
    imageIds === undefined &&
    stackIds === undefined &&
    categoryId === undefined
  ) {
    return res.status(400).json({
      status: "400 - Bad Request",
      message: "At least one field must be provided for update",
    });
  };

  // types validation
  if (name !== undefined && typeof name !== "string") {
    return res.status(400).json({ status: "400 - Bad request", message: "'name' must be a string" })
  };

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({ status: "400 - Bad request", message: "'description' must be a string" })
  };

  if (more_info !== undefined && typeof more_info !== "string") {
    return res.status(400).json({ status: "400 - Bad request", message: "'more_info' must be a string" })
  };

  if (deploy_link !== undefined && typeof deploy_link !== "string") {
    return res.status(400).json({ status: "400 - Bad request", message: "'deploy_link' must be a string" })
  };

  if (repository_link !== undefined && typeof repository_link !== "string") {
    return res.status(400).json({ status: "400 - Bad request", message: "'repository_link' must be a string" })
  };

  if (imageIds !== undefined) {
    if (!Array.isArray(imageIds) || !imageIds.every(id => typeof id === "number" && !isNaN(id))) {
      return res.status(400).json({ status: "400 - Bad request", message: "'imageIds' must be an array of numbers" })
    }
  };

  if (stackIds !== undefined) {
    if (!Array.isArray(stackIds) || !stackIds.every(id => typeof id === "number" && !isNaN(id))) {
      return res.status(400).json({ status: "400  - Bad request", message: "'stackIds' must be an array of numbers" })
    }
  };

  if (categoryId !== undefined && (isNaN(Number(categoryId)) || !Number.isInteger(Number(categoryId)))) {
    return res.status(400).json({ status: "400 - Bad request", message: "'categoryId' must be a valid integer number" })
  };

  // verify if project exists
  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
    include: { category: true }
  });

  if ( !project ) {
    return res.status(404).json({
      status: "404 - Not Found",
      message: "Project not found",
    });
  };
  
  // check if category exists (only if provided)
  if (categoryId !== undefined && categoryId !== null) {
    const categoryExists = await prisma.projectCategory.findUnique({
      where: { id: Number(categoryId) },
    });

    if (!categoryExists) {
      return res.status(404).json({
        status: "404 - Not Found",
        message: `Project category with id '${categoryId}' not found`,
      });
    }
  }

  // append project into request
  (req as any).project = project;

  // success case
  next()
} 
