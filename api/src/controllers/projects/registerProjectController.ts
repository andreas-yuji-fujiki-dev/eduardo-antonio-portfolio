import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";
import { ProjectRequestBody } from "../../types/projectRequestBody";

export default async function registerProjectController(
  req: Request<{},{},ProjectRequestBody>,
  res:Response
){
  const {
      name,
      description,
      more_info,
      deploy_link,
      repository_link,
      imageIds,
      stackIds
  } = req.body;

  try {
    // verify if there is possibility of project names conflict
    const existingProject = await prisma.project.findUnique({ where: { name } });

    if (existingProject) {
      return res.status(409).json({
        status: "409 - Conflict",
        message: "A project with this name already exists.",
      });
    }

    // creating new project
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        more_info,
        deploy_link,
        repository_link,

        // connecting images
        images: {
          connect: imageIds?.map(id => ({ id })) || [],
        },

        // creating relations with stacks
        stacks: {
          create: stackIds?.map(stackId => ({
            stack: { connect: { id: stackId } }
          })) || [],
        }
      },
      include: {
        images: true,
        stacks: {
          include: { stack: true }
        }
      }
    });

    // success message
    return res.status(201).json({
      status: "201 - Created",
      message: "Project created successfully.",
      data: newProject,
    });

  } catch (error) {
    // in case of server internal error
    return res.status(500).json({
      status: "500 - Internal Server Error",
      message: "Error while registering new project.",
      error: error instanceof Error ? error.message : error,
    });
  }
}
