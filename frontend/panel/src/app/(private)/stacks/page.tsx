"use client";

import { useState } from "react";

import PageContainer from "@/components/PageContainer";
import CustomTitle from "@/components/CustomTitle";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

export default function StacksManagementPage(){
    const [ stackSearchValue, setStackSearchValue ] = useState<string>('');

    function handleSearch(){
        alert('Search')
    };

    return(
        <PageContainer className="flex flex-col gap-4">
            {/* page title */}
            <CustomTitle variant="primary">
                Stacks Management
            </CustomTitle>

            {/* search input */}
            <div className="flex">
                <CustomInput 
                    value={ stackSearchValue }
                    onChange={ (e) => setStackSearchValue(e.target.value) } 
                    placeholder="Search for stacks"
                    className="rounded-r-none border-r-0"
                />
                <CustomButton 
                    variant="search"
                    className="flex items-center rounded-l-none"
                    onClick={() => handleSearch() }
                />
            </div>
        </PageContainer>
    );
};