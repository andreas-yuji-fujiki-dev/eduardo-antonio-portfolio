import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { prisma } from '../../config/prismaClient';

// multer config for images upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'image-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas!'));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

export default [
  upload.single('image'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    
    try {
      // verify if image exists
      const image = await prisma.image.findUnique({ where: { id: Number(id) }});

      if (!image) {
        return res.status(404).json({
            status: "404 - Not found",
            message: `Image with id '${id}' does not exists`
        })
      }

      // add the current image into request
      req.existingImage = image;
      next()

    } catch (error) {
      // if error, remove the uploaded file
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error('Error deleting file:', err);
        });
      }
    }
  }
]