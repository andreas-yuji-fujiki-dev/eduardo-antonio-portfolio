import { Request, Response, NextFunction } from "express";

export default function UpdateImageCategoryMiddleware(req: Request, res: Response, next: NextFunction) {
  // id
  const { id } = req.params;
  const parsedId = Number(id);

  // name
  const { name } = req.body;

  // validating id
  if (!id || isNaN(parsedId) || !Number.isInteger(parsedId) || parsedId <= 0) {
    return res.status(400).json({
      message: "You must provide the category 'id' as a valid positive integer in request params"
    });
  }

  // validating name
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({
      message: "You must provide the image category name as a non-empty string to update"
    });
  }

  // success
  (req as any).imageCategoryId = parsedId;
  next();
}
