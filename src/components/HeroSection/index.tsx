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
        <>
            <img src="/shapes/heroShape1.svg" />
            <img src="/shapes/heroShape2.svg" />

            <main>
                <div>
                    <h1>
                        <span>
                            Hi, I'm
                        </span>
                        Eduardo
                    </h1>
                    <p>
                        An 18 years old brazilian ongoing designer and software engineer.
                    </p>
                </div>
                <CustomButton 
                    backgroundColor="#fafafa" 
                    variant="default"
                    icon={<FaGithub />} 
                    link="https://github.com/EduardoAntonio77"
                >
                    Take a look at Github
                </CustomButton>
            </main>

            <SocialButtons hideGh={false} />
            
            <a href="#projects">
                <CiDesktopMouse1 />
                <MdKeyboardDoubleArrowDown />
            </a>
        </>
    );
};