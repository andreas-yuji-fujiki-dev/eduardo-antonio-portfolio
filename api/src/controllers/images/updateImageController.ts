import { Request, Response } from 'express';
import { prisma } from '../../config/prismaClient';
import fs from 'fs';
import path from 'path';

export default async function updateImageController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name, projectId, stackId } = req.body;
    const existingImage = req.existingImage;

    // verify if there is at least one field to update
    if (!req.file && !name && projectId === undefined && stackId === undefined) {
      return res.status(400).json({ 
        status: 400,
        message: 'No fields provided for update',
        data: null
      });
    }

    const updateData: {
      name?: string;
      projectId?: number | null;
      stackLogo?: { connect?: { id: number }, disconnect?: boolean };
    } = {};

    let newFilename = existingImage.name;

    // update image file
    if (req.file) {
      newFilename = req.file.filename;

      // remove old image
      const oldImagePath = path.join('uploads', existingImage.name);
      fs.unlink(oldImagePath, (err) => {
        if (err && err.code !== 'ENOENT') {
          console.error('Error deleting old image:', err);
        }
      });
      
      updateData.name = newFilename;
    } 
    // update only name
    else if (name && name !== existingImage.name) {
      const oldExt = path.extname(existingImage.name);
      const newExt = path.extname(name);
      const finalExt = newExt || oldExt;
      newFilename = path.basename(name, newExt) + finalExt;

      // rename physical file
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

    // update projectId
    if (projectId !== undefined) {
      updateData.projectId = projectId === null ? null : Number(projectId);
    }

    // update stackLogo (stackId)
    if (stackId !== undefined) {
      if (stackId === null) {
        // remove association if stackId is null
        updateData.stackLogo = { disconnect: true };
      } else {
        // create new association
        updateData.stackLogo = { connect: { id: Number(stackId) } };
      }
    }

    // update image in database
    const updatedImage = await prisma.image.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        project: true,
        stackLogo: true
      }
    });

    return res.status(200).json({
      status: 200,
      message: 'Image updated successfully',
      data: {
        id: updatedImage.id,
        name: updatedImage.name,
        url: `/uploads/${updatedImage.name}`,
        projectId: updatedImage.projectId,
        stackId: updatedImage.stackLogo?.id || null
      }
    });

  } catch (error) {
    console.error('Error in updateImageController:', error);

    // if there was a file upload but an error occurred, remove the file
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting uploaded file:', err);
      });
    }
    
    return res.status(500).json({ 
      status: 500,
      message: error instanceof Error ? error.message : 'Error updating image',
      data: null
    });
  }
}