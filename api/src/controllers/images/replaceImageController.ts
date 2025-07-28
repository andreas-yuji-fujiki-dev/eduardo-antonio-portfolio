import { Request, Response } from 'express';
import { prisma } from '../../config/prismaClient';
import fs from 'fs';
import path from 'path';

export default async function replaceImageController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const existingImage = req.existingImage;
    const newImageFile = req.file;

    if (!newImageFile) {
      return res.status(400).json({
        status: 400,
        message: 'No image file provided'
      });
    }

    // Remove a imagem antiga do sistema de arquivos
    const oldImagePath = path.join('uploads', existingImage.name);
    fs.unlink(oldImagePath, (err) => {
      if (err && err.code !== 'ENOENT') { // Ignora se o arquivo não existir
        console.error('Error deleting old image:', err);
      }
    });

    // Atualiza no banco de dados
    const updatedImage = await prisma.image.update({
      where: { id: Number(id) },
      data: {
        name: newImageFile.filename // Usa o novo nome gerado pelo multer
      }
    });

    return res.status(200).json({
      status: 200,
      message: 'Image replaced successfully',
      data: {
        id: updatedImage.id,
        name: updatedImage.name,
        url: `/uploads/${updatedImage.name}`
      }
    });

  } catch (error) {
    console.error('Error replacing image:', error);
    
    // Remove o novo arquivo se houve erro
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    
    return res.status(500).json({
      status: 500,
      message: 'Error replacing image',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}