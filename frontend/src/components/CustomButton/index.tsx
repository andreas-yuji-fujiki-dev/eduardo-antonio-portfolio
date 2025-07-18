'use client';

// stores
import { useThemeStore } from "@/stores/themeStore";

// types
import { CustomButtonTypes } from "@/types/components/CustomButtonTypes";

// estilos por variant 
const variantStyles: Record<CustomButtonTypes["variant"], string> = {
  default: "px-4 py-2 rounded shadow-md",
  'no-icon': "px-9 py-2.5 rounded-[12px] uppercase text-white",
  transparent: "bg-transparent text-inherit hover:bg-gray-100",
  'just-icon': "",
};

// component
export default function CustomButton({ 
  icon,
  link,
  variant, 
  children, 
  backgroundColor,
  className
}: CustomButtonTypes) {
  const isDarkTheme = useThemeStore((state) => state.theme === 'dark');

  const themeStyle = (variant !== 'just-icon' && variant !== 'transparent') 
    ? (isDarkTheme ? 'bg-white text-black' : 'bg-black text-white')
    : '';


  const combinedClassName = `
    flex 
    items-center 
    justify-center
    cursor-pointer
    ${ themeStyle }
    ${ variantStyles[ variant ] }
    ${ className ?? '' }
  `.trim();

  const buttonElement = (
    <button
      className={ combinedClassName }
      style={ backgroundColor ? { backgroundColor } : {} }
    >
      {/* icon */}
      { icon && (
        <div className={`
          flex 
          items-center 
          ${variant !== 'just-icon' && variant !== 'no-icon' ? 'mr-2' : ''}
        `}>
          { icon }
        </div>
      )}

      {/* text */}
      {variant !== 'just-icon' && (
        <span className="flex items-center">
          {children}
        </span>
      )}
    </button>
  );

  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {buttonElement}
    </a>
  ) : (
    buttonElement
  );
}
