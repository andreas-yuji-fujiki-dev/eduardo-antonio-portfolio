import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function registerProjectController( req: Request, res:Response ){
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

  try {
    // verify if there is possibility of project names conflict
    const existingProject = await prisma.project.findUnique({ where: { name } });

    if (existingProject) {
      return res.status(409).json({
        status: "409 - Conflict",
        message: `A project with the name '${name}' already exists`,
      })
    };

    // creating new project
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        more_info,
        deploy_link,
        repository_link,

        ...(categoryId && { category: { connect: { id: Number(categoryId) } } }),

        // connect images
        images: {
          connect: imageIds?.map((id: number) => ({ id })) || [],
        },

        // create relation with stacks
        stacks: {
          create: stackIds?.map((stackId: number) => ({
            stack: { connect: { id: stackId } },
          })) || [],
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        more_info: true,
        deploy_link: true,
        repository_link: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        images: true,
        stacks: {
          include: { stack: true },
        }
      },
    });

    // success message
    return res.status(201).json({
      status: "201 - Created",
      message: "Project created successfully",
      data: newProject,
    });

  } catch (error) {
    // in case of server internal error
    return res.status(500).json({
        status: "500 - Internal server error",
        error: "An unexpected error ocurred",
        details: error?.message || String(error)
    })
  }
}
