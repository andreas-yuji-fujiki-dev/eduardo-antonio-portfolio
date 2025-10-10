import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function updateImageCategoryController(req: Request, res: Response) {
  // converted and validated id
  const parsedId = (req as any).imageCategoryId as number;

  // data for update
  const { name } = req.body;

  try {
    // update
    const updatedImageCategory = await prisma.imageCategory.update({
      where: { id: parsedId },
      data: { name }
    });

    // success 
    return res.status(200).json({
      message: `Successfully updated category '${parsedId}' to name '${name}'`,
      data: updatedImageCategory
    });

  } catch (error: any) {
    // internal server error
    return res.status(500).json({
      status: "500 - Internal server error",
      error: "Something went wrong",
      details: error?.message || String(error)
    });
  }
}
