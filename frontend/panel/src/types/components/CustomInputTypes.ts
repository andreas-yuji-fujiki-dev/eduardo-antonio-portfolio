import { ChangeEvent, HTMLInputTypeAttribute } from "react";

export type CustomInputTypes = {
    type?: HTMLInputTypeAttribute;
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
};