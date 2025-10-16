import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

import validateId from "../../utils/validateId";
import validateString from "../../utils/validateString";
import validateNumberArray from "../../utils/validateNumbersArray";

export default async function editStackMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, experience, logoId, categoryId, projectIds } = req.body;

        // string field validation
        if (name !== undefined) {
            const invalid = validateString("name", name, res);
            if (invalid) return invalid;
        }

        // numeric field validation
        if (experience !== undefined) {
            const invalid = validateId("experience", experience, res);
            if (invalid) return invalid;
        }

        if (logoId !== undefined) {
            const invalid = validateId("logoId", logoId, res);
            if (invalid) return invalid;
        }

        // nullable numeric field validation
        if (categoryId !== undefined && categoryId !== null) {
            const invalid = validateId("categoryId", categoryId, res);
            if (invalid) return invalid;
        }

        // number array validation
        if (projectIds !== undefined) {
            const invalid = validateNumberArray("projectIds", projectIds, res);
            if (invalid) return invalid;
        }

        // existence validation
        if (logoId !== undefined) {
            const existingLogoImage = await prisma.image.findUnique({
                where: { id: Number(logoId) }
            });

            if (!existingLogoImage) {
                return res.status(404).json({
                    status: "404 - Not Found",
                    message: `Cannot find any image with id '${logoId}'`
                });
            }
        }

        if (categoryId !== undefined && categoryId !== null) {
            const existingStackCategory = await prisma.stackCategory.findUnique({
                where: { id: Number(categoryId) }
            });

            if (!existingStackCategory) {
                return res.status(404).json({
                    status: "404 - Not Found",
                    message: `Cannot find any stack category with id '${categoryId}'`
                });
            }
        }

        if (projectIds !== undefined) {
            const invalid = validateNumberArray("projectIds", projectIds, res);
            if (invalid) return invalid;
        }

        // success case
        next()

    } catch (error: any) {
        // internal server error
        return res.status(500).json({
            status: "500 - Internal Server Error",
            error: "An unexpected error occurred",
            details: error?.message || String(error)
        })
    }
}
