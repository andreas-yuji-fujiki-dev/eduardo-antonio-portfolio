import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

import validateId from "../../utils/validateId";
import validateString from "../../utils/validateString";

export default async function UpdateImageCategoryMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    // id
    const { id } = req.params;
    const parsedId = Number(id);

    // name
    const { name } = req.body;

    // validating id
    const errorValidatingId = validateId('id', id, res);
    if (errorValidatingId) return errorValidatingId;

    // validating name
    const errorValidatingName = validateString('name', name, res);
    if( errorValidatingName ) return errorValidatingName;

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
