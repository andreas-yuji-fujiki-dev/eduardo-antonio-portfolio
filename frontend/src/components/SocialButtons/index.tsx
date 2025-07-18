'use client';

// components
import CustomButton from '../CustomButton';
import SocialButtonsPathsJson from '@/constants/SocialButtonsPaths.json';

// types
import { SocialButtonsProps } from '@/types/components/SocialButtonTypes';

// icons
import { FaWhatsapp, FaInstagram, FaGithub, FaDiscord } from "react-icons/fa";
import { CiLinkedin, CiMail } from "react-icons/ci";


// assignment of string to component
const iconComponents = {
  FaWhatsapp: FaWhatsapp,
  CiLinkedin: CiLinkedin,
  FaInstagram: FaInstagram,
  FaDiscord: FaDiscord,
  CiMail: CiMail,
  FaGithub: FaGithub
};

// social buttons component
export default function SocialButtons({ hideGh = false }: SocialButtonsProps) {
  return (
    <div className="flex gap-4">
      {SocialButtonsPathsJson
        .filter(item => !(hideGh && item.icon === 'FaGithub'))
        .map((item, index) => {
          const IconComponent = iconComponents[item.icon as keyof typeof iconComponents];
          
          return (
            <CustomButton
              key={index}
              link={item.path}
              variant='just-icon'
              icon={<IconComponent className='w-7 h-7'/>}
            />
          );
        })
      }
    </div>
  );
}