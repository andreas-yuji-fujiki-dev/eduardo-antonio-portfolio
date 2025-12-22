import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";
import { makeErrorResponse } from "../../utils/errorResponse";

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
      status: "200 - Success",
      message: `Successfully updated category '${parsedId}' to name '${name}'`,
      data: updatedImageCategory
    });

  } catch (error: any) {
    // internal server error
    const response = makeErrorResponse(error, "Something went wrong")
    return res.status(500).json(response)
  };
}
