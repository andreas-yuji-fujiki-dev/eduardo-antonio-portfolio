import { ReactNode } from "react";

export interface CustomButtonTypes {
    variant: 
        'default' 
        | 'secondary'
        | 'highlighted' 
        | 'deactivated'
        | 'add'
        | 'search';
    
    children?: ReactNode;
    className?: string;
    onClick?: () => void;
};