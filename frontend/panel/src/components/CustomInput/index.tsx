"use client";

import { CustomInputTypes } from "@/types/components/CustomInputTypes";

export default function CustomInput({ 
    type,
    placeholder, 
    value, 
    onChange, 
    className
}: CustomInputTypes) {

    return (
        <input
            className={`
                p-2 
                border 
                rounded 
                min-w-45 
                max-w-92
                w-full
                ${className}
            `}
            type={type || 'text'}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};