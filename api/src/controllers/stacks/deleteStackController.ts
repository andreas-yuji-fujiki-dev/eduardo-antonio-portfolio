import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function deleteStackController(req: Request, res: Response) {
  const { id } = req.params;
  const stackId = Number(id);

  try {
    await prisma.$transaction(async (tx) => {

      // removing linkage with projects (pivot table)
      await tx.projectStack.deleteMany({
        where: { stackId }
      });

      // remove linkage with stack and image (logo)
      // FK is in Stack.logoId
      await tx.stack.update({
        where: { id: stackId },
        data: { logoId: null }
      });

      // deleting stack
      await tx.stack.delete({
        where: { id: stackId }
      });

    });

    // success case
    return res.status(200).json({
      status: "200 - Success",
      message: `Stack with id '${id}' deleted successfully`
    });

  } catch (error: any) {
    // internal server error case
    console.error("Error deleting stack:", error);

    return res.status(500).json({
      status: "500 - Internal server error",
      error: "An unexpected error occurred",
      details: error?.message || String(error)
    });
  }
}
