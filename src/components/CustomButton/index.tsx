// types
import { CustomButtonTypes } from "@/types/components/CustomButtonTypes";

// custom button component
export default function CustomButton({ 
    icon,
    link,
    variant, 
    children, 
    backgroundColor,
}: CustomButtonTypes){
    return(
        <a href={link && link} target="_blank">
            <button style={ backgroundColor ? { backgroundColor: backgroundColor } : {} }>
                {/* icon */}
                {icon && (
                    <div>
                        {icon}
                    </div>
                )}

                {/* button content */}
                {children}
            </button>
        </a>
    );
};