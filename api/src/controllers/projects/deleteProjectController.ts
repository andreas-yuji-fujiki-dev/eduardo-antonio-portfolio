import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function deleteProjectController(req: Request, res: Response){
  const { id } = req.params;

  try {
    // verify if project exists
    const projectExists = await prisma.project.findUnique({ where: { id: Number(id) }});
    
    if( !projectExists ){
      return res.status(404).json({
        status: "404 - Not found",
        message: `Project with id ${id} does not exists`
      });
    };

    // deleting
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
    // internal server error case
    return res.status(500).json({
        status: "500 - Internal server error",
        error: "An unexpected error ocurred",
        details: error?.message || String(error)
    })
  }
}
