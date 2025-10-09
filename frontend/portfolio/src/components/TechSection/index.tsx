"use client";

import TechCard from "@/components/TechCard";
import TechsJson from "@/constants/Techs.json";
const AstronautAnimation = "/shapes/astronaut-animation.gif";

import { useThemeStore } from "@/stores/themeStore";

export default function TechSection() {
    const isDarkTheme = useThemeStore((state) => state.theme === 'dark');

    return (
        <section 
            id="tech"
            className={`
                mb-25
                flex
            `}   
        >
            <div className={`
                w-[100%]
                sm:w-[85%]
            `}>
                <div 
                    className={`
                        mb-15    
                    `}
                >
                    <h2 
                        style={{ fontFamily: "var(--font-roboto-slab)" }}
                        className={`
                            flex
                            flex-col
                            lowercase
                            text-8xl
                            sm:text-9xl
                            font-extrabold
                        `}
                    >
                        <span
                            className={`
                                text-[18px]
                                mb-[-10px]
                                sm:text-2xl
                                sm:mb-[-20px]
                                opacity-65
                            `}
                        >
                            Let's talk about
                        </span>
                        Tech.
                    </h2>
                    <p 
                        style={ { fontFamily: "var(--font-roboto-slab)" } }
                        className={`
                            mt-2
                            font-semibold
                        `}
                    >
                        In my personal journey, I already worked with some
                        techonologies, and here they are:
                    </p>
                </div>

                <div
                    className={`
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        gap-y-10
                    `}
                >
                    { TechsJson.map( ( tech, index ) => (
                        <TechCard 
                            key={ index }
                            name={ tech.name }
                            logo={ tech.logo }
                            experienceLevel={ tech.experienceLevel }
                        />
                    )) }
                </div>
            </div>
            <div className={`
                hidden

                lg:flex 
                lg:sticky
                lg:justify-center 
                lg:items-center 
                lg:flex-wrap 
                lg:gap-4 
                lg:mt-4
            `}>
                <img 
                    src={AstronautAnimation} 
                    alt="Astronaut being controlled by two hands animation" 
                    className={`
                        ${!isDarkTheme ? "invert" : ""}    
                    `}
                />
            </div>
        </section>
    );
}