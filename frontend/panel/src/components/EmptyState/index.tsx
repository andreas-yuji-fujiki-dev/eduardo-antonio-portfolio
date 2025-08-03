"use client";

import { EmptyStateProps } from "@/types/components/EmptyStateProps";

export default function EmptyState({ searchValue, onClearSearch }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <p className="text-lg">No images found</p>
      {searchValue && (
        <button 
          onClick={onClearSearch} 
          className="text-blue-600 mt-2 cursor-pointer"
        >
          Clear search
        </button>
      )}
    </div>
  );
}