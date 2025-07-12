import CustomButton from "../CustomButton";

import { RiSendPlaneLine } from "react-icons/ri";
import { FaWhatsapp, FaDiscord } from "react-icons/fa";

import SocialButtonsPathsJson from "@/constants/SocialButtonsPaths.json";

export default function ContactSection() {
  const shapeImage = "/shapes/contactShape.svg";

  return (
    <section 
      className={`
        relative
        mt-15
        w-full
        px-6
        py-20
      `}
      id="hire-me"
    >
      {/* shape */}
      <img
        className={`
          absolute
          right-0
          top-[-25vh]
          max-w-[25vw]
          z-10
          pointer-events-none
          select-none
        `}
        src={shapeImage}
        alt="Decorative shape"
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
                max-w-[65%]
            `}
        >
            <h2
                style={{ fontFamily: "var(--font-sugarpunch)" }}
                className={`
                    font-sugarpunch
                    text-7xl
                    leading-tight
                `}
            >
                Want to have an <br />
                awesome project done?
            </h2>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum, inventore sequi eos sed a provident laudantium consequatur ab culpa natus impedit quasi, facere tempore maxime. Doloremque totam culpa perferendis suscipit. Lorem, ipsum dolor sit amet.
            </p>
        </div>

        {/* contact options */}
        <div
            className={`
                flex
                gap-3
                items-center    
            `}
        >

            {/* email input */}
            <div
                className={`
                    flex
                    items-center

                    rounded-full

                    w-[35%]
                    border

                    bg-white
                    text-black
                `} 
            >
                <input
                    className={`
                        flex-1
                        py-2
                        pl-4
                        text-black
                        outline-none
                    `} 
                    type="text"
                    placeholder="Enter your e-mail address here"
                />
                <button
                    className={`
                        cursor-pointer

                        flex
                        items-center
                        gap-1

                        bg-black
                        text-white
                        h-[95%]

                        py-2
                        px-5
                        rounded-full
                        border-1
                    `}
                >
                    Send <RiSendPlaneLine />
                </button>
            </div>

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
    </section>
  );
}
