import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getAllProjectsController(req: Request, res: Response) {
  try {
    // get all projects
    const allProjects = await prisma.project.findMany({
      include: {
        images: true,
        stacks: { include: { stack: true } },
        category: true
      }
    });

    // success message
    return res.status(200).json({
      status: "200 - Success",
      data: !allProjects.length ? 'No projects found...' : allProjects
    });

  } catch (error) {
    // in case of server internal error
    return res.status(500).json({
      status: "500 - Internal server error",
      message: "Something went wrong while fetching projects.",
      error: error instanceof Error ? error.message : error
    });
  }
}
