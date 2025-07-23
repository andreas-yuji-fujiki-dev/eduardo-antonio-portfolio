"use client";

import { CustomInputTypes } from "@/types/CustomInputTypes";

export default function CustomInput({ placeholder, value, onChange, className }: CustomInputTypes) {
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
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};