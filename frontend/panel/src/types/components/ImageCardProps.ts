import { RefObject } from "react";
import { ImageObjectTypes } from "../api/images/ImageObjectTypes";

export interface ImageCardProps {
  img: ImageObjectTypes;
  onEditName: (img: ImageObjectTypes, newName: string) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onReplace: (id: number) => void;
  replaceInputRef: RefObject<HTMLInputElement>;
}