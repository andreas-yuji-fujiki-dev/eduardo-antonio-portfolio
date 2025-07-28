import { JwtPayload } from "jsonwebtoken";
import { Image } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
      existingImage?: Image;
      imageToDelete?: {
        id: number;
        name: string;
      };
    }
  }
}
