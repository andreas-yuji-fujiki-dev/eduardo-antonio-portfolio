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

    // avoiding name conflict
    const nameConflict = await prisma.project.findUnique({ where: { name } });
    if (nameConflict) {
      return res.status(409).json({
        status: "409 - Conflict",
        message: `A project already exists with the name '${name}'`
      });
    }

    // required strings validation
    for (const [key, value] of Object.entries(requiredFields)) {
      const invalid = validateString(key, value, res);
      if (invalid) return;
    }

    // validating number arrays
    if (imageIds) {
      const invalid = validateNumberArray("imageIds", imageIds, res);
      if (invalid) return;

      // check if all image IDs exist
      const images = await prisma.image.findMany({
        where: { id: { in: imageIds } },
        select: { id: true },
      });

      const existingImageIds = images.map(img => img.id);
      const missingImages = imageIds.filter((id: number) => !existingImageIds.includes(id));

      if (missingImages.length > 0) {
        return res.status(404).json({
          status: "404 - Not found",
          message: `The following image IDs do not exist: ${missingImages.join(", ")}`,
        });
      }
    }

    if (stackIds) {
      const invalid = validateNumberArray("stackIds", stackIds, res);
      if (invalid) return;

      // check if all stack IDs exist
      const stacks = await prisma.stack.findMany({
        where: { id: { in: stackIds } },
        select: { id: true },
      });

      const existingStackIds = stacks.map(s => s.id);
      const missingStacks = stackIds.filter((id: number) => !existingStackIds.includes(id));

      if (missingStacks.length > 0) {
        return res.status(404).json({
          status: "404 - Not found",
          message: `The following stack IDs do not exist: ${missingStacks.join(", ")}`,
        });
      }
    }

    // validating categoryId
    if (categoryId) {
      const invalid = validateId("categoryId", categoryId, res);
      if (invalid) return;

      const categoryExists = await prisma.projectCategory.findUnique({ where: { id: Number(categoryId) } });

      if (!categoryExists) {
        return res.status(404).json({
          status: "404 - Not found",
          message: `Project category with id '${categoryId}' does not exist`,
        });
      }
    }

    // success case
    next();

  } catch (error: any) {
    // internal server error
    return res.status(500).json({
      status: "500 - Internal server error",
      error: "An unexpected error occurred",
      details: error?.message || String(error),
    });
  }
}
