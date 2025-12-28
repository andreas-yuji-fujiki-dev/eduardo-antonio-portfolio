import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function searchProjectsController(req: Request, res: Response) {
  try {
    const { q } = req.query;
    
    const formattedQuery = 
      String(q)
      .toLowerCase()
      .replace(/"/g, ``);

    const searchResult = await prisma.project.findMany({
      where: {
        OR: [
          // project base data
          { name: { contains: formattedQuery } },
          { name: { endsWith: formattedQuery } },
          { name: { equals: formattedQuery } },
          { name: { startsWith: formattedQuery } },

          { description: { contains: formattedQuery } },
          { description: { endsWith: formattedQuery } },
          { description: { equals: formattedQuery } },
          { description: { startsWith: formattedQuery } },

          { more_info: { contains: formattedQuery } },
          { more_info: { endsWith: formattedQuery } },
          { more_info: { equals: formattedQuery } },
          { more_info: { startsWith: formattedQuery } },

          { repository_link: { contains: formattedQuery } },
          { repository_link: { endsWith: formattedQuery } },
          { repository_link: { equals: formattedQuery } },
          { repository_link: { startsWith: formattedQuery } },

          { deploy_link: { contains: formattedQuery } },
          { deploy_link: { endsWith: formattedQuery } },
          { deploy_link: { equals: formattedQuery } },
          { deploy_link: { startsWith: formattedQuery } },
          
          // search in project category
          { category: { name: { contains: formattedQuery }}},
          { category: { name: { endsWith: formattedQuery }}},
          { category: { name: { equals: formattedQuery }}},
          { category: { name: { startsWith: formattedQuery }}},
          
          // search in project stacks
          { stacks: { some: { stack: { name: { contains: formattedQuery } } } } },
          { stacks: { some: { stack: { name: { endsWith: formattedQuery } } } } },
          { stacks: { some: { stack: { name: { equals: formattedQuery } } } } },
          { stacks: { some: { stack: { name: { startsWith: formattedQuery } } } } },
        ]
      },
      include: { 
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

    return res.status(200).json({
        status: "200 - Success",
        message: "Successfully searched",
        data: searchResult ? searchResult : 'Nothing found...'
    })

  } catch (error) {
    // internal server error
    return res.status(500).json({ 
        status: "500 - Internal server error",
        error: "An unexpected error ocurred",
        details: error?.message || String(error)
    })
  }
}
