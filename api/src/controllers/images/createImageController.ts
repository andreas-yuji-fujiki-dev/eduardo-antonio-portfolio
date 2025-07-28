import { Request, Response } from 'express';
import { prisma } from '../../config/prismaClient';
import fs from 'fs';
import path from 'path';

export default async function createImageController(req: Request, res: Response) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const { originalname, filename, path: filePath } = req.file;

    // Extrai a extensão do arquivo
    const ext = path.extname(originalname).toLowerCase();

    // Cria a imagem no banco de dados
    const image = await prisma.image.create({
      data: {
        name: filename,
      }
    });

    // Retorna a imagem criada
    return res.status(201).json({
      message: 'Image uploaded successfully',
      image: {
        id: image.id,
        name: image.name,
        url: `/uploads/${filename}`
      }
    });
    
  } catch (error) {
    // Se ocorrer um erro, remove o arquivo enviado
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error deleting file:', err);
      });
    }
    return res.status(500).json({ error: 'Error uploading image' });
  }
}