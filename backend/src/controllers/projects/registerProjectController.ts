import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";
import { ProjectRequestBody } from "../../types/projectRequestBody";

export default async function registerProjectController(
  req: Request<{}, {}, ProjectRequestBody>,
  res: Response
) {
  try {
    const {
      name,
      description,
      more_info,
      deploy_link,
      repository_link
    } = req.body;

    const existingProject = await prisma.project.findUnique({
      where: { name },
    });

    if (existingProject) {
      return res.status(409).json({
        status: "409 - Conflict",
        message: "A project with this name already exists.",
      });
    }

    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        more_info,
        deploy_link,
        repository_link
      }
    });

    return res.status(201).json({
      status: "201 - Created",
      data: newProject,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500 - Internal Server Error",
      message: "Error while registering new project.",
      error: error instanceof Error ? error.message : error,
    });
  }
}
