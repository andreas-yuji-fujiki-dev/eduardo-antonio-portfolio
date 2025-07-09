// components
import CustomButton from "../CustomButton";
import SocialButtons from "../SocialButtons";

// icons
import { FaGithub } from "react-icons/fa";

import { CiDesktopMouse1 } from "react-icons/ci";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

// hero section component
export default function HeroSection(){
    return(
        <div>
            <img src="/shapes/heroShape1.svg" className={`
                absolute
                left-0
                w-[27%]
            `} />
            <img src="/shapes/heroShape2.svg" className={`
                absolute
                right-0
                w-[27%]
            `}/>

            <main className={`
                mt-3
                h-[90vh]

                flex
                flex-col
                justify-center
                items-center
                gap-5
            `}>
                <div className={`
                    text-center
                    max-w-[52%]
                    w-full
                `}>
                    <div>
                        <span
                            className={`
                                block
                                font-sugarpunch
                                text-xl
                                sm:text-2xl
                                md:text-3xl
                                lg:text-4xl
                                xl:text-4xl
                                leading-tight
                            `}
                            style={{ fontFamily: 'var(--font-sugarpunch), sans-serif' }}
                        >
                            Hi, I'm <br />
                        </span>
                        <h1
                            className={`
                                font-sugarpunch
                                text-3xl
                                sm:text-5xl
                                md:text-6xl
                                lg:text-7xl
                                xl:text-[5.5rem]
                                sm:mt-4
                                md:mt-6
                                leading-tight
                            `}
                            style={{ fontFamily: 'var(--font-sugarpunch), sans-serif' }}
                        >
                            Eduardo <br />
                            Antonio
                        </h1>
                        <p className={`
                            text-base
                            sm:text-lg
                            md:text-xl
                            lg:text-2xl
                            xl:text-[1.5rem]
                            leading-tight
                        `}>
                            An 18 years old brazilian <br />
                            ongoing software engineer.
                        </p>
                    </div>
                </div>
                <CustomButton 
                    variant="default"
                    icon={<FaGithub size={20} />} 
                    link="https://github.com/EduardoAntonio77"
                >
                    Take a look at Github
                </CustomButton>

                <SocialButtons hideGh={true} />

                <a href="#projects" className={`
                    flex
                    flex-col
                    justify-center
                    items-center
                    gap-1
                    text-2xl
                    hover:text-gray-300
                    transition-colors  
                `}>
                    <CiDesktopMouse1 />
                    <MdKeyboardDoubleArrowDown />
                </a>
            </main>
        </div>
    );
};