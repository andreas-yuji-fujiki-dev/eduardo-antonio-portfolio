"use client";

// components
import CustomButton from "../CustomButton";
import SocialButtons from "../SocialButtons";

// icons
import { FaGithub } from "react-icons/fa";

import { CiDesktopMouse1 } from "react-icons/ci";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

import { useThemeStore } from "@/stores/themeStore";
import SocialButtonsPathsJson from "@/constants/SocialButtonsPaths.json";

// hero section component
export default function HeroSection(){
    const githubLink = SocialButtonsPathsJson[0].path;
    const isDarkTheme = useThemeStore((state) => state.theme === 'dark');

    return(
        <div 
            className={`
                mt-22
            `}
        >
            <img 
                src="/shapes/heroShape1.svg" 
                className={`
                    absolute
                    left-0
                    top-[50%]
                    translate-y-[-50%]
                    w-[25%]
                    ${!isDarkTheme ? "invert" : ""}

                    hidden
                    md:flex
                    md:w-[20%]
                `} 
            />
            <img 
                src="/shapes/heroShape2.svg" 
                className={`
                    absolute
                    right-0
                    top-[50%]
                    translate-y-[-50%]
                    w-[25%]
                    ${!isDarkTheme ? "invert" : ""}

                    hidden
                    md:flex
                    md:w-[20%]
                `}
            />

            <main 
                className={`
                mt-3
                    min-h-[90dvh]

                    flex
                    flex-col
                    justify-center
                    items-center
                    gap-8
                    md:min-h-[93dvh]
                `}
            >
                <div className={`
                    text-center
                    sm:max-w-[60%]
                    w-full
                `}>
                    <div
                        className={`
                            flex
                            flex-col
                            gap-3
                            sm:gap-0
                        `}
                    >
                        <span
                            className={`
                                text-[2.5rem]
                                sm:text-5xl
                                md:text-5xl
                                2xl:text-6xl
                                leading-tight
                            `}
                            style={{ fontFamily: 'var(--font-sugarpunch), sans-serif' }}
                        >
                            Hi, I'm <br />
                        </span>
                        <h1
                            className={`
                                text-[4.5rem]
                                sm:text-8xl
                                md:text-8xl
                                2xl:text-9xl
                                
                                sm:mt-3
                                2xl:mt-6

                                leading-tight
                            `}
                            style={{ fontFamily: 'var(--font-sugarpunch), sans-serif' }}
                        >
                            Eduardo <br />
                            Antonio
                        </h1>
                    </div>
                    <p 
                        className={`
                            text-xl
                            md:text-2xl
                            xl:text-[1.5rem]
                            leading-tight
                        `}
                    >
                        An 18 years old brazilian <br />
                        ongoing software engineer.
                    </p>
                </div>
                <CustomButton 
                    variant="default"
                    icon={ <FaGithub size={20} /> } 
                    link={githubLink}
                >
                    Take a look at Github
                </CustomButton>

                <SocialButtons hideGh={ true } />

                <a 
                    href="#projects" 
                    className={`
                        flex
                        flex-col
                        justify-center
                        items-center
                        gap-1
                        text-2xl
                        hover:text-gray-300
                        transition-colors  
                    `}
                >
                    <CiDesktopMouse1 />
                    <MdKeyboardDoubleArrowDown />
                </a>
            </main>
        </div>
    );
};