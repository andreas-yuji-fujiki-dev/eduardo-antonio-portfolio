// imports
import { ReactNode } from "react";

// custom button component types
export interface CustomButtonTypes {
    variant: 'default' | 'no-icon' | 'transparent';
    children: ReactNode;
    backgroundColor: string;
    icon?: ReactNode;
}