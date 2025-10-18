import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

import validateString from "../../utils/validateString";

export default async function searchStackCategoriesController(req: Request, res: Response) {
  try {
    const { q } = req.query;

    const errorValidatingQuery = validateString('query', q, res);
    if ( errorValidatingQuery ) return errorValidatingQuery;
    
    const formattedQuery = String(q).toLowerCase();

    const searchResult = await prisma.stackCategory.findMany({
      where: { name: { contains: formattedQuery } },
      include: { stacks: true }
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
