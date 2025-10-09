import { Request, Response, NextFunction } from "express";

export default function editStackMiddleware(req: Request, res: Response, next: NextFunction) {
    const { name, experience, logoId, categoryId } = req.body;

    // name field validation 
    if (name !== undefined && typeof name !== "string") {
        return res.status(400).json({
            status: "400 - Bad Request",
            message: "If provided, 'name' must be a string",
        });
    }

    // experience field validation
    if (experience !== undefined && typeof experience !== "number") {
        return res.status(400).json({
            status: "400 - Bad Request",
            message: "If provided, 'experience' must be a number",
        });
    }

    // logo id's field validation
    if (logoId !== undefined && (typeof logoId !== "number" || isNaN(logoId))) {
        return res.status(400).json({
            status: "400 - Bad Request",
            message: "If provided, 'logoId' must be a valid number",
        });
    }

    // category id's field validation
    if (categoryId !== undefined && categoryId !== null && (typeof categoryId !== "number" || isNaN(categoryId))) {
        return res.status(400).json({
            status: "400 - Bad Request",
            message: "If provided, 'categoryId' must be a valid number or null",
        });
    }

    next()
}
