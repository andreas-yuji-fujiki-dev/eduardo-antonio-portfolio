import { PageContainerTypes } from "@/types/components/PageContainerTypes";

export default function PageContainer( { children, className }: PageContainerTypes ){
    return (
        <div 
            className={`
                pt-4
                max-w-[97svw]
                m-auto
                min-h-[90svh]
                
                ${className}
            `}
        >
            { children }
        </div>
    );
};