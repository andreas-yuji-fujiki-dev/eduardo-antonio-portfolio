// types
import { CustomButtonTypes } from "@/types/components/CustomButtonTypes";

// custom button component
export default function CustomButton({ 
    icon,
    variant, 
    children, 
    backgroundColor
}: CustomButtonTypes){
    return(
        <button>
            {/* icon */}
            {icon && (
                <div>
                    {icon}
                </div>
            )}

            {/* button content */}
            {children}
        </button>
    );
};