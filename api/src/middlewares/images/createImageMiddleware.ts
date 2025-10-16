import multer from 'multer';
import path from 'path';
import fs from 'fs';

// multer request interface
import { MulterRequest } from '../../types/middlewares/images/createImageMiddlewareTypes';

// ensure upload folder exists
const uploadDir = path.resolve('uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
};

// multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
  },
});

// accept only images
const fileFilter = (
  req: MulterRequest,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedTypes = /\.(jpeg|jpg|png|gif)$/i;
  const isValidExt = allowedTypes.test(path.extname(file.originalname));
  const isValidMime = /^image\/(jpeg|png|gif)$/.test(file.mimetype);

  if (isValidExt && isValidMime) {
    cb(null, true);
  } else {
    req.fileValidationError = 'Only JPEG, PNG, GIF are allowed!';
    cb(null, false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// exporting
export default upload.single('image');