import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";
import { makeErrorResponse } from "../../utils/errorResponse";

export default async function searchImageCategoryController(req: Request, res: Response) {
  try {
    const { q } = req.query;
    
    const formattedQuery = String(q).toLowerCase();

    const searchResult = await prisma.imageCategory.findMany({
      where: { name: { contains: formattedQuery } },
      include: { images: true }
    });

    return res.status(200).json({
        status: "200 - Success",
        message: "Successfully searched",
        data: searchResult ? searchResult : 'Nothing found...'
    })

  } catch (error: unknown) {
    // internal server error
    const response = makeErrorResponse(error, "An unexpected error ocurred")
    return res.status(500).json(response)
  };
};
