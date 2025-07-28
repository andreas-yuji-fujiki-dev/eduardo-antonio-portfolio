"use client";

import { 
    useState, 
    useEffect, 
    useRef, 
    ChangeEvent 
} from "react";

import { 
  getAllImages, 
  editImageNameById, 
  uploadImage,
  replaceImage,
  deleteImageById
} from "@/utils/api/routes/images";

import PageContainer from "@/components/PageContainer";
import CustomButton from "@/components/CustomButton";
import CustomTitle from "@/components/CustomTitle";
import CustomInput from "@/components/CustomInput";

import { ImageObjectTypes } from "@/types/api/images/ImageObjectTypes";

import { 
    FaEdit, 
    FaTimes, 
    FaCheck, 
    FaPen, 
    FaTrash, 
    FaUpload, 
    FaSync 
} from "react-icons/fa";

import { toast } from "react-toastify";

export default function ImagesManagementPage() {
    const [ apiImagesData, setApiImagesData ] = useState<ImageObjectTypes[] | null>(null);
    const [ searchInputValue, setSearchInputValue ] = useState<string>('');
    const [ filteredImages, setFilteredImages ] = useState<ImageObjectTypes[] | null>(null);
    const [ editingImageId, setEditingImageId ] = useState<number | null>(null);
    const [ editedName, setEditedName ] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const replaceFileInputRef = useRef<HTMLInputElement>(null);
    const [ replacingImageId, setReplacingImageId ] = useState<number | null>(null);


    // Fetch all images
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

    // Filter images based on search input
    useEffect(() => {
        if (apiImagesData) {
            const filtered = apiImagesData.filter(img => 
                img.name.toLowerCase().includes(searchInputValue.toLowerCase())
            );
            setFilteredImages( filtered );
        }
    }, [ searchInputValue, apiImagesData ]);

    // Initial fetch
    useEffect(() => { 
        fetchAllImages() 
    }, []);

    // Handle image upload
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

    // Handle image replacement
    const handleReplaceImage = async (e: ChangeEvent<HTMLInputElement>) => {
        console.log('Replace triggered', e.target.files); // Debug
        
        if (e.target.files && e.target.files[0] && replacingImageId) {
            try {
            console.log('Replacing image ID:', replacingImageId); // Debug
            
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            
            const response = await replaceImage({
                id: replacingImageId,
                image: e.target.files[0]
            });
            
            console.log('Replace response:', response); // Debug
            
            toast.success("Image replaced successfully");
            await fetchAllImages();
            } catch (error) {
            console.error("Error details:", error); // Debug mais detalhado
            toast.error("Failed to replace image");
            } finally {
            setReplacingImageId(null);
            if (replaceFileInputRef.current) {
                replaceFileInputRef.current.value = '';
            }
            }
        }
    };

    // Edit functions
    const handleStartEditing = (img: ImageObjectTypes) => {
        setEditingImageId(img.id);
        setEditedName(img.name);
    };

    const handleCancelEditing = () => {
        setEditingImageId(null);
        setEditedName("");
    };

    const handleConfirmEditing = async (img: ImageObjectTypes) => {
        if (editedName.trim() === "" || editedName === img.name) {
            handleCancelEditing();
            return;
        }

        try {
            const updatedImage = await editImageNameById({
                id: img.id,
                name: editedName
            });
            
            toast.success("Image name updated successfully");
            
            setApiImagesData(prev => 
                prev?.map(image => 
                    image.id === img.id 
                        ? { ...image, name: updatedImage.name, url: updatedImage.url }
                        : image
                ) || null
            );
            
            setFilteredImages(prev => 
                prev?.map(image => 
                    image.id === img.id 
                        ? { ...image, name: updatedImage.name, url: updatedImage.url }
                        : image
                ) || null
            );
                
            handleCancelEditing();
        } catch (error) {
            console.error("Error editing image name:", error);
            toast.error("Failed to update image name");
        }
    };

    // Delete image
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

    return (
        <PageContainer className="flex flex-col gap-4">
            <CustomTitle variant="primary">
                Images Management
            </CustomTitle>

            {/* Search and Upload */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-1">
                    <CustomInput
                        className="rounded-r-none border-r-0 flex-1"
                        placeholder="Search images by name"
                        value={searchInputValue}
                        onChange={(e) => setSearchInputValue(e.target.value)}
                    />
                    <CustomButton 
                        variant="search" 
                        className="rounded-l-none flex justify-center items-center" 
                    />
                </div>
                
                {/* Upload Button */}
                <CustomButton 
                    variant="default" 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2"
                >
                    <FaUpload /> Upload Image
                </CustomButton>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                />
            </div>

            {/* Hidden input for image replacement */}
            <input
                type="file"
                ref={replaceFileInputRef}
                onChange={handleReplaceImage}
                accept="image/*"
                className="hidden"
            />

            {/* Images Grid */}
            {filteredImages && filteredImages.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredImages.map((img) => (
                        <div key={img.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
                                
                                {/* Image Overlay */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setReplacingImageId(img.id);
                                                replaceFileInputRef.current?.click();
                                            }}
                                            className="p-2 bg-white rounded-full hover:bg-purple-100 transition-colors"
                                            title="Replace Image"
                                        >
                                            <FaSync className="text-purple-600" />
                                        </button>
                                        <button 
                                            onClick={() => handleStartEditing(img)}
                                            className="p-2 bg-white rounded-full hover:bg-blue-100 transition-colors"
                                            title="Edit Name"
                                        >
                                            <FaPen className="text-blue-600" />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteImage(img.id)}
                                            className="p-2 bg-white rounded-full hover:bg-red-100 transition-colors"
                                            title="Delete"
                                        >
                                            <FaTrash className="text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Image Info */}
                            <div className="p-3">
                                {editingImageId === img.id ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={editedName}
                                            onChange={(e) => setEditedName(e.target.value)}
                                            className="border rounded px-2 py-1 flex-1 text-sm"
                                            autoFocus
                                        />
                                        <button
                                            onClick={() => handleConfirmEditing(img)}
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
                                            onClick={() => handleStartEditing(img)}
                                            className="text-blue-600 hover:text-blue-800 p-1"
                                            title="Edit name"
                                        >
                                            <FaEdit size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <p className="text-lg">No images found</p>
                    {searchInputValue && (
                        <button 
                            onClick={() => setSearchInputValue('')} 
                            className="text-blue-600 mt-2"
                        >
                            Clear search
                        </button>
                    )}
                </div>
            )}
        </PageContainer>
    );
}