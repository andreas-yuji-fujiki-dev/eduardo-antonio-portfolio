import { Request, Response } from 'express';
import { prisma } from '../../config/prismaClient';
import fs from 'fs';
import path from 'path';

export default async function updateImageController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const existingImage = req.existingImage;

    if (!req.file && !name) {
      return res.status(400).json({ 
        status: 400,
        message: 'No image or name provided for update',
        data: null
      });
    }

    const updateData: { name?: string } = {};
    let newFilename = existingImage.name;

    // if there is a new image file
    if (req.file) {
      newFilename = req.file.filename;
      
      // removing old image
      const oldImagePath = path.join('uploads', existingImage.name);
      fs.unlink(oldImagePath, (err) => {
        if (err && err.code !== 'ENOENT') {
          console.error('Error deleting old image:', err);
        }
      });
    } 

    // if only name is being updated
    else if (name && name !== existingImage.name) {
      const oldExt = path.extname(existingImage.name);
      const newExt = path.extname(name);

      // keeps the original file extension if a new was not provided
      const finalExt = newExt || oldExt;
      
      newFilename = path.basename(name, newExt) + finalExt;
      
      // renaming fisic file
      const oldPath = path.join('uploads', existingImage.name);
      const newPath = path.join('uploads', newFilename);
      
      try {
        fs.renameSync(oldPath, newPath);
      } catch (err) {
        console.error('Error renaming file:', err);
        throw new Error('Failed to rename image file');
      }
    }

    // updating the file name on database
    if (req.file || name) {
      updateData.name = newFilename;
    }

    const updatedImage = await prisma.image.update({
      where: { id: Number(id) },
      data: updateData
    });

    return res.status(200).json({
      status: 200,
      message: 'Image updated successfully',
      data: {
        id: updatedImage.id,
        name: updatedImage.name,
        url: `/uploads/${updatedImage.name}`
      }
    });

  } catch (error) {
    console.error('Error in updateImageController:', error);
    
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