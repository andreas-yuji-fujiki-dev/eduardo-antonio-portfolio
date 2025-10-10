import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

export default async function registerProjectMiddleware( req: Request, res: Response, next: NextFunction ) {
  try {
    const { 
      name,
      description,
      more_info,
      deploy_link,
      repository_link,
      imageIds,
      stackIds,
      categoryId
    } = req.body;

    // all this fields are required
    const requiredFields = {
      name,
      description,
      more_info,
      deploy_link,
      repository_link,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value || String(value).trim() === "")
      .map(([key]) => key);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: "400 - Bad request",
        error: `Missing required field(s): ${missingFields.join(", ")}`,
        hint:
          "Required: 'name', 'description', 'more_info', 'deploy_link', 'repository_link'. Optional: 'imageIds', 'stackIds', 'categoryId'",
      })
    };

    // arrays validation
    if (imageIds && !Array.isArray(imageIds)) {
      return res.status(400).json({
        status: "400 - Bad request",
        error: "'imageIds' must be an array of IDs",
      })
    };

    if (stackIds && !Array.isArray(stackIds)) {
      return res.status(400).json({
        status: "400 - Bad request",
        error: "'stackIds' must be an array of IDs",
      })
    };

    if (categoryId && isNaN(Number(categoryId))) {
      return res.status(400).json({
        status: "400 - Bad request",
        error: "'categoryId' must be a valid integer number",
      })
    };

    // verify if category exists (if provided id)
    if( categoryId ){
      const cateogryExists = await prisma.projectCategory.findUnique({ where: { id: Number(categoryId) }});

      if(!cateogryExists) return res.status(400).json({
        status: "400 - Bad request",
        message: `Project category with id '${categoryId}' does not exists`
      })
    };

    // proceed
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