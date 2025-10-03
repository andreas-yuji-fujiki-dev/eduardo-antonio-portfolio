import { Request, Response, NextFunction } from "express";

export default function createImageCategoryMiddleware(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body;

  // validation
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({
      message: "The field 'name' is required and must be a non-empty string."
    });
  }

  // success case
  next();
}
