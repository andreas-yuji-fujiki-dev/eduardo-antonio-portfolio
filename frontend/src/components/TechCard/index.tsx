import Image from "next/image";
import StairLevelIndicator from "../StairLevelIndicator";

import { TechCardTypes } from "@/types/components/TechCardTypes";

import { useThemeStore } from "@/stores/themeStore";

export default function TechCard({ 
    name, 
    logo, 
    experienceLevel, 
}: TechCardTypes ) {
    const isDarkTheme = useThemeStore((state) => state.theme === 'dark');

    let experienceText = '';
    switch(experienceLevel){
        case 1:
            experienceText = 'beginner';
            break;
        case 2:
            experienceText = 'experienced';
            break;
        case 3:
            experienceText = 'advanced';
            break;
        default:
            experienceText = 'beginner';
    };

    return(
        <div 
            className={`
                flex
                gap-3
                w-full
            `}
        >
            <div 
                className={`
                    flex
                    min-w-15
                    min-h-15
                `}
            >
                <Image 
                    width={75}
                    height={75}
                    src={ logo } 
                    alt={ `${name}'s Logo` }
                    className={`
                        max-w-15
                        max-h-15
                        w-full
                        h-full
                        ${!isDarkTheme ? "invert" : ""}
                    `}
                />
            </div>
            
            <div 
                className={`
                    flex
                    flex-col
                    gap-0.5
                `}
            >
                <h3 
                    className={`
                        first-letter:uppercase    
                    `}
                >
                    { name }
                </h3>
                <div
                    className={`
                        flex
                        items-end
                        gap-1.5
                    `}
                >
                    <StairLevelIndicator 
                        level={ experienceLevel }
                    /> 
                    
                    <p 
                        className={`
                            first-letter:uppercase
                            opacity-60
                            mb-[-4.5]
                        `}
                    >
                        { experienceText }
                    </p>
                </div>
            </div>
        </div>
    );
};