import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function searchProjectsController(req: Request, res: Response) {
  try {
    const { q } = req.query;
    
    const formattedQuery = String(q).toLowerCase();

    const searchResult = await prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: formattedQuery } },
          { description: { contains: formattedQuery } },
          { more_info: { contains: formattedQuery } },
          { repository_link: { contains: formattedQuery } },
          { deploy_link: { contains: formattedQuery } }
        ]
      },
      include: { 
        category: true,
        images: true,
        stacks: true
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
