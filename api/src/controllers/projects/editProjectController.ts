import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function editProjectController(req: Request, res: Response) {
  const { id } = req.params;

  const {
    name,
    description,
    more_info,
    deploy_link,
    repository_link,
    imageIds,
    stackIds,
  } = req.body;

  try {
    // updating basic fields of the project
    const updatedProject = await prisma.project.update({
      where: { id: Number(id) },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(more_info !== undefined && { more_info }),
        ...(deploy_link !== undefined && { deploy_link }),
        ...(repository_link !== undefined && { repository_link }),
      },
    });

    // validating if all images exists
    if (Array.isArray(imageIds)) {
      const existingImages = await prisma.image.findMany({
        where: { id: { in: imageIds } }
      });
      if (existingImages.length !== imageIds.length) {
        return res.status(400).json({
          status: "400 - Bad Request",
          message: "Some image IDs do not exist."
        });
      }
    }

    // validate existance of all stacks
    if (Array.isArray(stackIds)) {
      const existingStacks = await prisma.stack.findMany({
        where: { id: { in: stackIds } }
      });
      if (existingStacks.length !== stackIds.length) {
        return res.status(400).json({
          status: "400 - Bad Request",
          message: "Some stack IDs do not exist."
        });
      }
    }

    // updating images association
    if (Array.isArray(imageIds)) {
      if (imageIds.length > 0) {

        // remove images that is not anymore on the list
        await prisma.image.updateMany({
          where: {
            projectId: Number(id),
            id: { notIn: imageIds },
          },
          data: { projectId: null },
        });

        // linking sended images
        await prisma.image.updateMany({
          where: { id: { in: imageIds } },
          data: { projectId: Number(id) },
        });
      } else {
        // if empty array, remove all images association
        await prisma.image.updateMany({
          where: { projectId: Number(id) },
          data: { projectId: null },
        });
      }
    }

    // update association of the stacks if sended
    if (Array.isArray(stackIds)) {
      // remove all old associations of the project
      await prisma.projectStack.deleteMany({
        where: { projectId: Number(id) },
      });

      // creating new associations if there is stacks
      if (stackIds.length > 0) {
        const newRelations = stackIds.map((stackId: number) => ({
          projectId: Number(id),
          stackId,
        }));

        await prisma.projectStack.createMany({
          data: newRelations,
        });
      }
    }

    // get full project with updated images and stacks
    const projectWithRelations = await prisma.project.findUnique({
      where: { id: Number(id) },
      include: {
        images: true,
        stacks: {
          include: { stack: true },
        },
      },
    });

    return res.status(200).json({
      status: "200 - Success",
      message: "Project updated successfully.",
      project: projectWithRelations,
    });

  } catch (error) {
    // in case of server internal error
    return res.status(500).json({
      status: "500 - Internal Server Error",
      message: "Error while updating project.",
      error: error instanceof Error ? error.message : error,
    });
  }
}
