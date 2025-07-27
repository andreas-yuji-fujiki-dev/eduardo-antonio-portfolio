import { ImageObjectTypes } from "./ImageObjectTypes";

export interface ApiImagesResponseTypes {
  status: number;
  message: string;
  data: ImageObjectTypes[];
}