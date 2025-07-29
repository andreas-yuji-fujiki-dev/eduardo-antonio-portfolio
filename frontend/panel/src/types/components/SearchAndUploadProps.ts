import { RefObject, ChangeEvent } from "react";

export interface SearchAndUploadProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onUploadClick: () => void;
  fileInputRef: RefObject<HTMLInputElement>;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}