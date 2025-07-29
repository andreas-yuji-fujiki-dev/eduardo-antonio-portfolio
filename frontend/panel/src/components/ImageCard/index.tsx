"use client";

import { useState } from "react";
import { FaEdit, FaTimes, FaCheck, FaPen, FaTrash, FaSync } from "react-icons/fa";

import { ImageCardProps } from "@/types/components/ImageCardProps";

export default function ImageCard({ 
  img, 
  onEditName, 
  onDelete, 
  onReplace, 
  replaceInputRef 
}: ImageCardProps) {
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(img.name);

  const handleConfirmEditing = async () => {
    await onEditName(img, editedName);
    setIsEditing(false);
  };

  const handleCancelEditing = () => {
    setEditedName(img.name);
    setIsEditing(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image Preview */}
      <div className="relative group">
        <img
          className="w-full h-48 object-cover"
          src={`/api/uploads/${img.name}`}
          alt={img.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
          }}
        />
        
        {/* image overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onReplace(img.id);
                replaceInputRef.current?.click();
              }}
              className="p-2 bg-white rounded-full hover:bg-purple-100 transition-colors"
              title="Replace Image"
            >
              <FaSync className="text-purple-600" />
            </button>
            <button 
              onClick={() => setIsEditing(true)}
              className="p-2 bg-white rounded-full hover:bg-blue-100 transition-colors"
              title="Edit Name"
            >
              <FaPen className="text-blue-600" />
            </button>
            <button 
              onClick={() => onDelete(img.id)}
              className="p-2 bg-white rounded-full hover:bg-red-100 transition-colors"
              title="Delete"
            >
              <FaTrash className="text-red-600" />
            </button>
          </div>
        </div>
      </div>

      {/* image info */}
      <div className="p-3">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="border rounded px-2 py-1 flex-1 text-sm"
              autoFocus
            />
            <button
              onClick={handleConfirmEditing}
              className="text-green-600 hover:text-green-800 p-1"
              title="Confirm"
            >
              <FaCheck />
            </button>
            <button
              onClick={handleCancelEditing}
              className="text-red-600 hover:text-red-800 p-1"
              title="Cancel"
            >
              <FaTimes />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm truncate" title={img.name}>
              {img.name}
            </h3>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:text-blue-800 p-1"
              title="Edit name"
            >
              <FaEdit size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}