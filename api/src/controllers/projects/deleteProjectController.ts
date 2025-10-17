import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function deleteProjectController(req: Request, res: Response){
  const { id } = req.params;

  try {
    // project to display on response
    const existingProject = await prisma.project.findUnique({ where: { id: Number(id) }});

    // deleting
    await prisma.project.delete({ where: { id: Number(id) }});

    // success
    return res.status(200).json({
      status: "200 - Success",
      message: `Successfully deleted the project with id '${id}'`,
      data: `Deleted: ${existingProject}`
    });

  } catch (error) {
    // internal server error case
    return res.status(500).json({
        status: "500 - Internal server error",
        error: "An unexpected error ocurred",
        details: error?.message || String(error)
    })
  }
}
