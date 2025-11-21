import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";
import { toASCII } from "punycode";

export default async function getAllProjectsController(req: Request, res: Response) {
  try {

    // pagination
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;
        const skip = (page - 1) * limit;

    // get all projects
    const allProjects = await prisma.project.findMany({
      skip,
      take: limit,
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

    // total number of existing projects
    const totalProjects = await prisma.project.count()

    // success message
    return res.status(200).json({
      status: "200 - Success",
      message: "Successfully got all the projects",
      pagination: {
        currentPage: page, limit,
        totalItems: totalProjects,
        totalPages : Math.ceil( totalProjects / limit ),
        hasPrevPage: page > 1,
        hasNextPage: page * limit < totalProjects
      },
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
