import { ChangeEvent } from "react";

export type CustomInputTypes = {
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
};