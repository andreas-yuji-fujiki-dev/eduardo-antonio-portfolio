import { Request, Response } from "express";
import { prisma } from "../../config/prismaClient";

export default async function editProjectController(req: Request, res: Response) {
    const { id } = req.params;
    const { 
      name, 
      description, 
      more_info,
      deploy_link,
      repository_link
    } = req.body;

    const updatedProject = await prisma.project.update({
        where: { id: Number(id) },
        data: {
            ...(name && { name }),
            ...(description && { description }),
            ...(more_info && { more_info }),
            ...(deploy_link && { deploy_link }),
            ...(repository_link && { repository_link })
        },
    });

    return res.status(200).json({
        status: "200 - Success",
        message: "Project updated successfully.",
        project: updatedProject
    });
}
