"use client";

import { useState, useEffect } from "react";

import PageContainer from "@/components/PageContainer";
import CustomButton from "@/components/CustomButton";
import CustomTitle from "@/components/CustomTitle";
import CustomInput from "@/components/CustomInput";

import { getAllImages, editImageNameById } from "@/utils/api/routes/images";
import { ImageObjectTypes } from "@/types/api/images/ImageObjectTypes";

import { FaEdit, FaTimes, FaCheck, FaPen } from "react-icons/fa";

export default function ImagesManagementPage() {
    const [apiImagesData, setApiImagesData] = useState<ImageObjectTypes[] | null>(null);
    const [searchInputValue, setSearchInputValue] = useState<string>('');

    const [editingImageId, setEditingImageId] = useState<number | null>(null);
    const [editedName, setEditedName] = useState<string>("");

    // function to get all api images
    async function fetchAllImages() {
        try {
            const response = await getAllImages();
            setApiImagesData(response);
        } catch (error) {
            console.error("An error occurred while getting all images from API:", error);
        }
    };

    useEffect(() => { fetchAllImages() }, []);

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
            await editImageNameById({
                id: img.id,
                name: editedName
            });

            await fetchAllImages(); // atualiza a lista

            handleCancelEditing();
        } catch (error) {
            console.error("Erro ao editar nome da imagem:", error);
        }
    };

    return (
        <PageContainer className="flex flex-col gap-4">
            <CustomTitle variant="primary">
                Images Management
            </CustomTitle>

            {/* search */}
            <div className="flex">
                <CustomInput
                    className="rounded-r-none border-r-0"
                    placeholder="Search images"
                    value={searchInputValue}
                    onChange={(e) => setSearchInputValue(e.target.value)}
                />
                <CustomButton variant="search" className="rounded-l-none flex justify-center items-center" />
            </div>

            {/* images list */}
            <div className="grid grid-cols-2">
                {apiImagesData?.map((img) => (
                    <div key={img.id} className="border border-blue-300 bg-red-300 p-4 m-2 space-y-2">
                        <div className="relative z-10">
                            <img
                                className="w-full h-80 object-cover"
                                src={img.name}
                                alt={img.description || img.name}
                            />

                            <div 
                                className={`
                                    edit-overflow

                                    w-full 
                                    h-full 
                                    bg-black
                                    opacity-20 
                                    absolute 
                                    top-0 
                                    left-0
                                    flex
                                    justify-center
                                    items-center
                                    z-200
                                    cursor-pointer
                                `}
                            >
                                <FaPen 
                                    fill="white" 
                                    className="opacity-100"
                                    size={25} 
                                />
                            </div>
                        </div>

                        {/* edição inline do nome */}
                        {editingImageId === img.id ? (
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    className="border rounded px-2 py-1 flex-1"
                                />
                                <CustomButton
                                    variant="secondary"
                                    onClick={() => handleConfirmEditing(img)}
                                    className="text-green-600 hover:text-green-800"
                                >
                                    <FaCheck />
                                </CustomButton>
                                <CustomButton
                                    variant="secondary"
                                    onClick={handleCancelEditing}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <FaTimes />
                                </CustomButton>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-sm break-all">{img.name}</h3>
                                <CustomButton
                                    variant="secondary"
                                    onClick={() => handleStartEditing(img)}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <FaEdit /> Editar nome
                                </CustomButton>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </PageContainer>
    );
}
