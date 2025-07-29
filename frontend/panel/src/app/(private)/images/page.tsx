"use client";

import { useState, useEffect, useRef, ChangeEvent, RefObject } 
    from "react";

import { getAllImages, editImageNameById, uploadImage, replaceImage, deleteImageById } 
    from "@/utils/api/routes/images";

import { toast } from "react-toastify";
import { ImageObjectTypes } from "@/types/api/images/ImageObjectTypes";

import PageContainer from "@/components/PageContainer";
import CustomTitle from "@/components/CustomTitle";
import ImageCard from "@/components/ImageCard";
import SearchAndUpload from "@/components/SearchAndUpload";
import EmptyState from "@/components/EmptyState";

export default function ImagesManagementPage() {
    const [apiImagesData, setApiImagesData] = useState<ImageObjectTypes[] | null>(null);
    const [searchInputValue, setSearchInputValue] = useState('');
    const [filteredImages, setFilteredImages] = useState<ImageObjectTypes[] | null>(null);
    const [replacingImageId, setReplacingImageId] = useState<number | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const replaceFileInputRef = useRef<HTMLInputElement>(null);
    
    // fetch all images
    async function fetchAllImages() {
        try {
            const response = await getAllImages();
            setApiImagesData(response);
            setFilteredImages(response);
        } catch (error) {
            console.error("Error fetching images:", error);
            toast.error("Failed to load images");
        }
    };

    // filter images based on search input
    useEffect(() => {
        if (apiImagesData) {
            const filtered = apiImagesData.filter(img => 
                img.name.toLowerCase().includes(searchInputValue.toLowerCase())
            );
            setFilteredImages(filtered);
        }
    }, [searchInputValue, apiImagesData]);

    // initial fetch
    useEffect(() => { 
        fetchAllImages() 
    }, []);

    // handle image upload
    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            try {
                await uploadImage({ image: e.target.files[0] });
                toast.success("Image uploaded successfully");
                await fetchAllImages();
            } catch (error) {
                console.error("Error uploading image:", error);
                toast.error("Failed to upload image");
            } finally {
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        }
    };

    // handle image replacement
    const handleReplaceImage = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && replacingImageId) {
            try {
                await replaceImage({ 
                    id: replacingImageId, 
                    image: e.target.files[0] 
                });
                
                toast.success("Image replaced successfully");
                await fetchAllImages();
            } catch (error) {
                console.error("Error replacing image:", error);
                toast.error("Failed to replace image");
            } finally {
                setReplacingImageId(null);
                if (replaceFileInputRef.current) {
                    replaceFileInputRef.current.value = '';
                }
            }
        }
    };

    // handle edit name
    const handleEditName = async (img: ImageObjectTypes, newName: string) => {
        if (newName.trim() === "" || newName === img.name) return;

        try {
            const updatedImage = await editImageNameById({
                id: img.id,
                name: newName
            });
            
            toast.success("Image name updated successfully");
            
            setApiImagesData(prev => 
                prev?.map(image => 
                    image.id === img.id 
                        ? { ...image, name: updatedImage.name, url: updatedImage.url }
                        : image
                ) || null
            );
        } catch (error) {
            console.error("Error editing image name:", error);
            toast.error("Failed to update image name");
        }
    };

    // handle delete image
    const handleDeleteImage = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this image?")) {
            try {
                await deleteImageById(id);
                toast.success("Image deleted successfully");
                await fetchAllImages();
            } catch (error) {
                console.error("Error deleting image:", error);
                toast.error("Failed to delete image");
            }
        }
    };

    // jsx
    return (
        <PageContainer className="flex flex-col gap-4">
            {/* page title */}
            <CustomTitle variant="primary">
                Images Management
            </CustomTitle>

            {/* search input & upload button to add a image */}
            <SearchAndUpload
                searchValue={searchInputValue}
                onSearchChange={setSearchInputValue}
                onUploadClick={() => fileInputRef.current?.click()}
                fileInputRef={fileInputRef as RefObject<HTMLInputElement>}
                onFileChange={handleImageUpload}
            />

            {/* hidden input for image replacement */}
            <input
                type="file"
                ref={replaceFileInputRef}
                onChange={handleReplaceImage}
                accept="image/*"
                className="hidden"
            />

            {/* images grid */}
            {filteredImages && filteredImages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredImages.map((img) => (
                        <ImageCard
                            key={img.id}
                            img={img}
                            onEditName={handleEditName}
                            onDelete={handleDeleteImage}
                            onReplace={setReplacingImageId}
                            replaceInputRef={replaceFileInputRef as RefObject<HTMLInputElement>}
                        />
                    ))}
                </div>
            ) : (
                <EmptyState 
                    searchValue={searchInputValue}
                    onClearSearch={() => setSearchInputValue('')}
                />
            )}
        </PageContainer>
    );
}