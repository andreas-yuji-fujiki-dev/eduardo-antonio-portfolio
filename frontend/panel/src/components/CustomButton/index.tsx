import { CustomButtonTypes } from "@/types/components/CustomButtonTypes";
import { HiMagnifyingGlass } from "react-icons/hi2";

export default function CustomButton({ variant, children, className, onClick }: CustomButtonTypes) {
    const baseButtonStyles = `
        px-4
        border-1
        rounded
        cursor-pointer
        transition
        hover:opacity-90

        flex
        gap-2
    `;

    if (variant === "search") {
        return (
            <button
                onClick={ onClick }
                className={`${baseButtonStyles} ${className}`}
                aria-label="Search button"
            >
                <HiMagnifyingGlass />
            </button>
        );
    }

    return (
        <button 
            onClick={ onClick }
            className={`
                ${baseButtonStyles}
                ${className}
            `}
        >
            {children}
        </button>
    );
}