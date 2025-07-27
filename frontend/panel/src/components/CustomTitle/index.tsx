import { CustomTitleTypes } from "@/types/components/CustomTitleTypes"

export default function CustomTitle( { variant, children, className } : CustomTitleTypes ){
    if(variant === 'primary'){
        return(
            <h2
                className={`
                    text-5xl

                    ${className}
                `}
            >
                { children }
            </h2>
        );
    };

    if(variant === 'secondary'){
        return(
            <h3
                className={`
                    text-4xl

                    ${className}
                `}
            >
                { children }
            </h3>
        );
    };

    if(variant === 'tertiary'){
        return(
            <h4
                className={`
                    text-3xl
                    ${className}
                `}
            >
                { children }
            </h4>
        );
    };
};