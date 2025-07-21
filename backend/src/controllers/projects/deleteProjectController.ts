import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function deleteProjectController(
  req: Request,
  res: Response,
) {
  try {
    const { id } = req.params;

    await prisma.project.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).json({
      status: "200 - Success",
      message: `Successfully deleted the project with id ${id}.`,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500 - Internal Server Error",
      message: error instanceof Error ? error.message : error,
    });
  }
}
