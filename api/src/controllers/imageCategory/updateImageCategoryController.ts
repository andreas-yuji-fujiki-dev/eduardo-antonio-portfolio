import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function updateImageCategoryController(req: Request, res: Response) {
  // converted and validated id
  const parsedId = (req as any).imageCategoryId as number;

  // data for update
  const { name } = req.body;

  try {
    // verify if exists
    const foundCategory = await prisma.imageCategory.findUnique({ where: { id: parsedId } });

    if (!foundCategory) {
      return res.status(404).json({
        message: `Cannot find the category with id ${parsedId}.`
      });
    }

    // update
    const updatedImageCategory = await prisma.imageCategory.update({
      where: { id: parsedId },
      data: { name }
    });

    // success 
    return res.status(200).json({
      message: `Successfully updated category ${parsedId} to name '${name}'.`,
      data: updatedImageCategory
    });

  } catch (error: any) {
    // internal server error
    return res.status(500).json({
      message: "An unexpected error occurred while updating the image category.",
      error: error?.message || String(error)
    });
  }
}
