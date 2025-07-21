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
    images
  } = req.body;

  // Checagem do ID
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({
      status: "400 - Bad Request",
      message: "Project ID must be a valid number.",
    });
  }

  // Checagem se ao menos um campo foi enviado
  if (
    name === undefined &&
    description === undefined &&
    more_info === undefined &&
    deploy_link === undefined &&
    repository_link === undefined
  ) {
    return res.status(400).json({
      status: "400 - Bad Request",
      message: "At least one field must be provided for update.",
    });
  }

  // Busca projeto no banco
  const project = await prisma.project.findUnique({
    where: { id: Number(id) },
  });

  if ( !project ) {
    return res.status(404).json({
      status: "404 - Not Found",
      message: "Project not found.",
    });
  }

  // Anexa projeto à request (evita busca duplicada no controller)
  (req as any).project = project;

  next();
}
