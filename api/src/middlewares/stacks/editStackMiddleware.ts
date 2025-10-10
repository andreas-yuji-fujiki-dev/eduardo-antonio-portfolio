import { Request, Response, NextFunction } from "express";
import { prisma } from "../../config/prismaClient";

export default async function editStackMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const { name, experience, logoId, categoryId, projectIds } = req.body;

        // fields validation
        const validations: { field: any, type: "string" | "number" | "nullableNumber" | "numberArray", name: string }[] = [
            { field: name, type: "string", name: "name" },
            { field: experience, type: "number", name: "experience" },
            { field: logoId, type: "number", name: "logoId" },
            { field: categoryId, type: "nullableNumber", name: "categoryId" },
            { field: projectIds, type: "numberArray", name: "projectIds" }
        ];

        for (const { field, type, name } of validations) {
            if (field === undefined) continue;

            if (type === "string" && (typeof field !== "string" || field.trim().length === 0)) {
                return res.status(400).json({ status: "400 - Bad Request", message: `If provided, '${name}' must be a string` })
            };

            if (type === "number" && (isNaN(Number(field)) || String(field).trim().length === 0)) {
                return res.status(400).json({ status: "400 - Bad Request", message: `If provided, '${name}' must be a valid number` })
            };

            if (type === "nullableNumber" && field !== null && (typeof field !== "number" || isNaN(field))) {
                return res.status(400).json({ status: "400 - Bad Request", message: `If provided, '${name}' must be a valid number or null` })
            };

            if (type === "numberArray") {
                if (!Array.isArray(field) || field.some(id => isNaN(Number(id)))) {
                    return res.status(400).json({
                        status: "400 - Bad Request",
                        message: `If provided, '${name}' must be an array of numbers`
                    })
                }
            };
        };

        // existance validation
        if (logoId !== undefined) {
            const existingLogoImage = await prisma.image.findUnique({ where: { id: Number(logoId) }});
            if(!existingLogoImage) return res.status(404).json({
                status: "404 - Not found",
                message: `Cannot find any image with id ${logoId}`
            });
        }

        if (categoryId !== undefined) {
            const existingStackCategory = await prisma.stackCategory.findUnique({ where: { id: Number(categoryId) }});
            if(!existingStackCategory) return res.status(404).json({
                status: "404 - Not found",
                message: `Cannot find any stack category with id ${categoryId}`
            });
        }

        if (projectIds !== undefined) {
            if (!Array.isArray(projectIds) || projectIds.some(id => isNaN(Number(id)))) {
                return res.status(400).json({
                    status: "400 - Bad Request",
                    message: "'projectIds' must be an array of numbers"
                })
            }
        };

        // success case
        next()
    } catch (error) {
        // internal server error
        return res.status(500).json({
            status: "500 - Internal server error",
            error: "An unexpected error occurred",
            details: error?.message || String(error)
        });
    }
}