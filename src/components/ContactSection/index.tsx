"use client";

import CustomButton from "../CustomButton";

import { RiSendPlaneLine } from "react-icons/ri";
import { FaWhatsapp, FaDiscord } from "react-icons/fa";

import SocialButtonsPathsJson from "@/constants/SocialButtonsPaths.json";

import { useThemeStore } from "@/stores/themeStore";

export default function ContactSection() {
  const shapeImage = "/shapes/contactShape.svg";
  const isDarkTheme = useThemeStore((state) => state.theme === 'dark');

  return (
    <section
        id="hire-me"
        className={`
            relative
            mt-15
            w-full
            px-6
            py-20
        `}
    >
      {/* shape */}
      <img
        className={`
            hidden
            
            md:flex
            absolute
            top-[50%]
            translate-y-[-60%]
            right-0

            max-w-[25vw]
            z-10
            pointer-events-none
            select-none

            ${!isDarkTheme ? "invert" : ""}
        `}
        src={shapeImage}
        alt="Decorative shape that contains a space and a planet."
      />

      {/* content */}
      <div 
        className={`
          flex
          flex-col
          gap-4

          relative
          z-20
          max-w-11/12
          w-full
          m-auto
        `}
      >
        {/* title and paragraph */}
        <div
            className={`
                flex
                flex-col
                gap-5
                w-[100%]
                md:w-[65%]
            `}
        >
            <h2
                style={{ fontFamily: "var(--font-sugarpunch)" }}
                className={`
                    font-sugarpunch
                    text-4xl
                    sm:text-7xl
                    leading-tight
                `}
            >
                Want to have an <br className="hidden lg:block" />
                awesome project done?
            </h2>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum, inventore sequi eos sed a provident laudantium consequatur ab culpa natus impedit quasi, facere tempore maxime. Doloremque totam culpa perferendis suscipit. Lorem, ipsum dolor sit amet.
            </p>
        </div>

        {/* contact options */}
        <div
            className={`
                mt-5
                flex
                flex-col
                sm:flex-row
                items-center
                gap-3
            `}
        >

            {/* email input */}
            <div
                className={`
                    flex
                    flex-col
                    sm:flex-row
                    justify-between
                    items-center

                    rounded-2xl
                    sm:rounded-full

                    md:max-w-[55%]
                    lg:max-w-[45%]
                    w-[100%]
                    border

                    bg-white
                    text-black
                `} 
            >
                <input
                    className={`
                        flex-1
                        w-full
                        py-6
                        px-6
                        sm:w-auto
                        sm:py-2
                        sm:pl-4
                        text-black
                        outline-none
                    `} 
                    type="email"
                    placeholder="Enter your e-mail address"
                />
                <button
                    className={`
                        cursor-pointer

                        flex
                        flex-1
                        sm:flex-0
                        w-[95%]
                        justify-center
                        items-center
                        gap-1

                        bg-black
                        text-white
                        h-[95%]

                        py-2
                        px-5
                        rounded-2xl
                        sm:rounded-full
                        border-1
                    `}
                >
                    Send <RiSendPlaneLine />
                </button>
            </div>

            <div
                className={`
                    mt-5
                    sm:mt-0
                    flex
                    items-center
                    gap-3
                `}
            >
                <span
                    className={`
                        uppercase    
                    `}
                >
                    Or
                </span>

                <div
                    className={`
                        flex
                        gap-3    
                    `}
                >
                    <CustomButton  
                        variant="just-icon"
                        icon={ <FaWhatsapp size={17} /> }
                        link={SocialButtonsPathsJson[1].path}
                    />
                    <CustomButton  
                        variant="just-icon"
                        icon={ <FaDiscord size={17} /> }
                        link={SocialButtonsPathsJson[4].path}
                    />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
