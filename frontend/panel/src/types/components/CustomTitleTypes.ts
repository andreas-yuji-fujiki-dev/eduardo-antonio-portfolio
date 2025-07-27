import { ReactNode } from "react";

export interface CustomTitleTypes {
    variant: 'primary' | 'secondary' | 'tertiary';
    children: ReactNode;
    className?: string;
};