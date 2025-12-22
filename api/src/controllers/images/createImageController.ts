import { Request, Response } from 'express';
import { prisma } from '../../config/prismaClient';
import { makeErrorResponse } from '../../utils/errorResponse';
import fs from 'fs';

export default async function createImageController(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    };

    const { filename } = req.file;

    // creating the image on database
    const image = await prisma.image.create({ data: { name: filename }});

    // returning the created image
    return res.status(201).json({
      status: "201 - Created",
      message: 'Image uploaded successfully',
      data: {
        id: image.id,
        name: image.name,
        url: `/uploads/${filename}`
      }
    });
    
  } catch (error: unknown) {
    // in case of error, remove the uploaded image
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    const response = makeErrorResponse(error, "An unexpected error ocurred")
    return res.status(500).json(response);
  }
}