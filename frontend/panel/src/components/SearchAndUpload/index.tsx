"use client";

import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import { FaUpload } from "react-icons/fa";
import { SearchAndUploadProps } from "@/types/components/SearchAndUploadProps";

export default function SearchAndUpload({
  searchValue,
  onSearchChange,
  onUploadClick,
  fileInputRef,
  onFileChange
}: SearchAndUploadProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex flex-1">
        <CustomInput
          className="rounded-r-none border-r-0 flex-1"
          placeholder="Search images by name"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <CustomButton 
          variant="search" 
          className="rounded-l-none flex justify-center items-center" 
        />
      </div>
      
      <CustomButton 
        variant="default" 
        onClick={onUploadClick}
        className="flex items-center gap-2"
      >
        <FaUpload /> Upload Image
      </CustomButton>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}