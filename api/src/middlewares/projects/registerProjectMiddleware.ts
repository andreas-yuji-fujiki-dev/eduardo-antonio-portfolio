import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

import validateId from "../../utils/validateId";
import validateString from "../../utils/validateString";
import validateNumberArray from "../../utils/validateNumbersArray";

export default async function registerProjectMiddleware(req: Request, res: Response, next: NextFunction) {
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

    // requiredFields
    const requiredFields = {
      name,
      description,
      more_info,
      deploy_link,
      repository_link,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => value === undefined || value === null)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      return res.status(400).json({
        status: "400 - Bad request",
        error: `Missing required field(s): ${missingFields.join(", ")}`,
        hint: "Required: 'name', 'description', 'more_info', 'deploy_link', 'repository_link'. Optional: 'imageIds', 'stackIds', 'categoryId'",
      });
    }

    // required strings validation
    for (const [key, value] of Object.entries(requiredFields)) {
      const invalid = validateString(key, value, res);
      if (invalid) return invalid;
    }

    // validating number arrays
    if (imageIds) {
      const invalid = validateNumberArray("imageIds", imageIds, res);
      if (invalid) return invalid;
    }

    if (stackIds) {
      const invalid = validateNumberArray("stackIds", stackIds, res);
      if (invalid) return invalid;
    }

    // validating categoryId
    if (categoryId) {
      const invalid = validateId("categoryId", categoryId, res);
      if (invalid) return invalid;

      const categoryExists = await prisma.projectCategory.findUnique({
        where: { id: Number(categoryId) },
      });

      if (!categoryExists) {
        return res.status(404).json({
          status: "404 - Not found",
          message: `Project category with id '${categoryId}' does not exists`,
        });
      }
    }

    // success case
    next()

  } catch (error: any) {
    // internal server error
    return res.status(500).json({
      status: "500 - Internal server error",
      error: "An unexpected error occurred",
      details: error?.message || String(error),
    });
  }
}
