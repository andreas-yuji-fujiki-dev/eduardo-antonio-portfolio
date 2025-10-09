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
    categoryId
  } = req.body;

  try {
    // update basic fields of the project
    await prisma.project.update({
      where: { id: Number(id) },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(more_info !== undefined && { more_info }),
        ...(deploy_link !== undefined && { deploy_link }),
        ...(repository_link !== undefined && { repository_link }),
        ...(categoryId !== undefined && { categoryId: categoryId === null ? null : Number(categoryId) }),
      },
    });

    // update images
    if (Array.isArray(imageIds)) {
      const existingImages = await prisma.image.findMany({
        where: { id: { in: imageIds } },
      });

      if (existingImages.length !== imageIds.length) {
        return res.status(400).json({
          status: "400 - Bad Request",
          message: "Some image IDs do not exist",
        });
      }

      // remove images that is not related anymore
      await prisma.image.updateMany({
        where: {
          projectId: Number(id),
          id: { notIn: imageIds },
        },
        data: { projectId: null },
      });

      // Relaciona novas imagens
      await prisma.image.updateMany({
        where: { id: { in: imageIds } },
        data: { projectId: Number(id) },
      });
    }

    // update stacks
    if (Array.isArray(stackIds)) {
      const existingStacks = await prisma.stack.findMany({
        where: { id: { in: stackIds } },
      });

      if (existingStacks.length !== stackIds.length) {
        return res.status(400).json({
          status: "400 - Bad Request",
          message: "Some stack IDs do not exist",
        });
      }

      await prisma.projectStack.deleteMany({
        where: { projectId: Number(id) },
      });

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

    // returning updated complete project
    const projectWithRelations = await prisma.project.findUnique({
      where: { id: Number(id) },
      include: {
        category: true, // including project too
        images: true,
        stacks: {
          include: { stack: true },
        },
      },
    });

    return res.status(200).json({
      status: "200 - Success",
      message: "Project updated successfully",
      project: projectWithRelations,
    });

  } catch (error) {
    return res.status(500).json({
      status: "500 - Internal server error",
      error: "An unexpected error occurred",
      details: error?.message || String(error),
    });
  }
}
