import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

import validateString from "../../utils/validateString";

export default async function createImageCategoryMiddleware(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body;

  try {
    // validation
    const errorValidatingName = validateString('name', name, res);

    if( errorValidatingName ) return errorValidatingName;

    // checking if a category with this name already exists
    const alreadyExists = 
        await prisma.imageCategory.findFirst({ where: { name } });
    
    if (alreadyExists) return res.status(409).json({
        status: "409 - Conflict",
        message: `An image category already exists with the name '${name}'`
    });

    // success case
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
