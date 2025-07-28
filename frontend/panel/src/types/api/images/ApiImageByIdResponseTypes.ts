import { ImageObjectTypes } from "./ImageObjectTypes";

export interface ApiImageByIdResponseTypes {
  status: number;
  message: string;
  data: ImageObjectTypes;
}