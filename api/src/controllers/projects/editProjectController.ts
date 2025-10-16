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
    categoryId,
  } = req.body;

  try {
    // updates basic fields of the project
    await prisma.project.update({
      where: { id: Number(id) },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(more_info !== undefined && { more_info }),
        ...(deploy_link !== undefined && { deploy_link }),
        ...(repository_link !== undefined && { repository_link }),
        ...(categoryId !== undefined && {
          categoryId: categoryId === null ? null : Number(categoryId),
        }),
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
          message: "Some image IDs do not exists",
        });
      }

      // removing older images
      await prisma.image.updateMany({
        where: {
          projectId: Number(id),
          id: { notIn: imageIds },
        },
        data: { projectId: null },
      });

      // relaciona novas
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
          message: "Some stack IDs do not exists",
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

        await prisma.projectStack.createMany({ data: newRelations });
      }
    }

    // search updated project
    const projectWithRelations = await prisma.project.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        description: true,
        more_info: true,
        deploy_link: true,
        repository_link: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        images: true,
        stacks: {
          include: { stack: true },
        },
      },
    });

    return res.status(200).json({
      status: "200 - Success",
      message: `Project with id '${id}' has been updated successfully`,
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
