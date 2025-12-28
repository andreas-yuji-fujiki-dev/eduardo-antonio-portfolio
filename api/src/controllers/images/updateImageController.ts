import { Request, Response } from 'express';
import { prisma } from '../../config/prismaClient';
import { makeErrorResponse } from '../../utils/errorResponse';
import fs from 'fs';
import path from 'path';

export default async function updateImageController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, projectId, stackId, categoryId } = req.body;
    const existingImage = (req as any).existingImage;

    const updateData: {
      name?: string;
      projectId?: number | null;
      stackLogo?: { connect?: { id: number }, disconnect?: boolean };
      categoryId?: number | null;
    } = {};

    let newFilename = existingImage.name;

    // file update
    if (req.file) {
      newFilename = req.file.filename;

      // remove imagem antiga
      const oldImagePath = path.join('uploads', existingImage.name);
      fs.unlink(oldImagePath, (err) => {
        if (err && err.code !== 'ENOENT') {
          console.error('Error deleting old image:', err);
        }
      });
      
      updateData.name = newFilename;
    } 

    // rename just the file
    else if (name && name !== existingImage.name) {
      const oldExt = path.extname(existingImage.name);
      const newExt = path.extname(name);
      const finalExt = newExt || oldExt;

      // replace " " with "-"
      const baseName = path
        .basename(name, newExt)
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase();

      newFilename = baseName + finalExt;
 
      // fisicaly rename
      const oldPath = path.join('uploads', existingImage.name);
      const newPath = path.join('uploads', newFilename);
      
      try {
        fs.renameSync(oldPath, newPath);
        updateData.name = newFilename;
      } catch (err) {
        console.error('Error renaming file:', err);
        throw new Error('Failed to rename image file');
      }
    }

    // update project id
    if (projectId !== undefined) {
      updateData.projectId = projectId === null ? null : Number(projectId);
    }

    // update stack logo
    if (stackId !== undefined) {
      if (stackId === null) {
        updateData.stackLogo = { disconnect: true };
      } else {
        updateData.stackLogo = { connect: { id: Number(stackId) } };
      }
    }

    // update category id
    if (categoryId !== undefined) {
      updateData.categoryId = categoryId === null ? null : Number(categoryId);
    }

    // save changes in database
    const updatedImage = await prisma.image.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        project: true,
        stackLogo: true,
        category: true
      }
    });

    // success message
    return res.status(200).json({
      status: 200,
      message: `Image with id '${id}' has been updated successfully`,
      data: updatedImage
    });

  } catch (error: unknown) {
    // error case
    console.error('Error in updateImageController:', error);

    // clear file if upload failed
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting uploaded file:', err);
      });
    }
    
    const response = makeErrorResponse(error, "An unexpected error ocurred")
    return res.status(500).json(response)
  }
}