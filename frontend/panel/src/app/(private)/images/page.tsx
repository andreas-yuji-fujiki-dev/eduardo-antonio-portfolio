"use client";

import { useState, useEffect } from "react";

import PageContainer from "@/components/PageContainer";
import CustomButton from "@/components/CustomButton";
import CustomTitle from "@/components/CustomTitle";
import CustomInput from "@/components/CustomInput";

export default function ImagesManagementPage() {
    const [ apiImagesData, setApiImagesData ] = useState<{}>({});
    const [searchInputValue, setSearchInputValue] = useState<string>('');

    useEffect(()=>{
        function fetchImages(){
            return ''
        };
        setApiImagesData(fetchImages());
    },[])

    return (
        <PageContainer className="flex flex-col gap-4">
            {/* title */}
            <CustomTitle variant="primary">
                Images Management
            </CustomTitle>

            {/* search */}
            <div
                className={`
                    flex    
                `}
            >
                <CustomInput 
                    className={`
                        rounded-r-none
                        border-r-0
                    `}
                    placeholder="Search images"
                    value={ searchInputValue }
                    onChange={(e) => setSearchInputValue(e.target.value)}
                />
                <CustomButton variant="search" className="rounded-l-none" />
            </div>

            {/* images list */}
        </PageContainer>
    );
}