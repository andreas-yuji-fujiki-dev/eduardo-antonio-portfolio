// imports
import { ReactNode } from "react";

// custom button component types
export interface CustomButtonTypes {
    variant: 'default' | 'no-icon' | 'transparent' | 'just-icon';
    children: ReactNode;
    backgroundColor?: string;
    icon?: ReactNode;
    link?: string
}