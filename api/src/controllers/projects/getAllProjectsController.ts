import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function getAllProjectsController(req: Request, res: Response) {
  try {
    // get all projects
    const allProjects = await prisma.project.findMany({
      select: {
          id: true,
          name: true,
          description: true,
          more_info: true,
          deploy_link: true,
          repository_link: true,
          category: true,
          images: {
            select: {
              name: true,
              id: true,
              category: true
            }
          },
          stacks: {
              select: {
                stack: {
                  select: {
                    id: true,
                    name: true,
                    experience: true,
                    category: true,
                    logo: true
                  }
                }
              }
          }
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
        error: "An unexpected error ocurred",
        details: error?.message || String(error)
    })
  }
}
