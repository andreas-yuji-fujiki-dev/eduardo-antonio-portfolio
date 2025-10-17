import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

import validateString from "../../utils/validateString";

export default async function searchImageCategoryController(req: Request, res: Response) {
  try {
    const { q } = req.query;

    const errorValidatingQuery = validateString('query', q, res);
    if ( errorValidatingQuery ) return errorValidatingQuery;
    
    const formattedQuery = String(q).toLowerCase();

    const categories = await prisma.imageCategory.findMany({
      where: { name: { contains: formattedQuery } },
      include: { images: true }
    });

    return res.status(200).json({
        status: "200 - Success",
        message: "Successfully searched",
        categories
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
