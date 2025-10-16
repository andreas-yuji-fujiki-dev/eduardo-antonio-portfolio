import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

export default async function UpdateImageCategoryMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // id
    const { id } = req.params;
    const parsedId = Number(id);

    // name
    const { name } = req.body;

    // validating id
    if (!id || isNaN(parsedId) || !Number.isInteger(parsedId) || parsedId <= 0) {
      return res.status(400).json({
        message: "You must provide the category 'id' as a valid positive integer in request params"
      })
    };

    // validating name
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({
        message: "You must provide the image category name as a non-empty string to update"
      });
    }

    // verify if image category exists
    const foundCategory = await prisma.imageCategory.findUnique({ where: { id: parsedId } });

    if (!foundCategory) {
      return res.status(404).json({
        message: `Cannot find the category with id '${parsedId}'`
      })
    };

    // success case
    (req as any).imageCategoryId = parsedId;
    next()
  } catch (error) {
    // internal server error
    return res.status(500).json({
      status: "500 - Internal server error",
      error: "An unexpected error ocurred",
      details: error?.message || String(error)
    })
  }
}
