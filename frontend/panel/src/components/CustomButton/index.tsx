import { CustomButtonTypes } from "@/types/CustomButtonTypes";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function CustomButton( { variant, children, className, onClick }: CustomButtonTypes ){
    const baseButtonStyles = `
        px-4
        border-1
        rounded
    `;

    if(variant === "search"){
        return (
            <button
                className={ `${baseButtonStyles} ${className}` }
            >
                <HiMagnifyingGlass />
            </button>
        );
    };

    return(
        <button 
            className={`
                ${baseButtonStyles}
                ${className}
            `}
        >
            { children }
        </button>
    );
};