'use client';

// stores
import { useThemeStore } from "@/stores/themeStore";

// header nav paths
import HeaderNavPathsJson from "@/constants/HeaderNavPaths.json";

// icons
import { GoSun } from "react-icons/go";
import { FaRegMoon } from "react-icons/fa";

// app header component
export default function AppHeader() {
  const { theme, toggleTheme } = useThemeStore();
  const isDarkMode = theme === 'dark';

  return (
    <header className={`
      flex
      justify-between
      items-center
      tracking-widest
      w-full

      fixed
      top-0
      left-0
      right-0
      z-50
      ${ isDarkMode ? 'bg-black text-white' : 'bg-white text-black' }

      h-[60px]
      px-4 sm:px-8 md:px-12

      **:transition-all
      **:duration-150
    `}>
      {/* Logo / Título */}
      <a href="/" className="flex-shrink-0">
        <h1 className={`
          text-base sm:text-lg md:text-xl lg:text-2xl
          font-bold
        `}>
          &lt;/&gt; .edward
        </h1>
      </a>

      {/* Navegação e Toggle */}
      <div className="flex items-center gap-4 sm:gap-6 md:gap-12">
        {/* Navigation */}
        <nav className="hidden sm:block">
          <ul className="flex gap-4 sm:gap-6 md:gap-12">
            {HeaderNavPathsJson.map((item, index) => (
              <li key={index}>
                <a
                  href={item.path}
                  className="hover:text-orange-400 transition-colors duration-150"
                >
                  {item.span}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Toggle theme button */}
        <button
          className="cursor-pointer hover:text-orange-400 text-xl"
          onClick={toggleTheme}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <GoSun /> : <FaRegMoon />}
        </button>
      </div>
    </header>
  );
}
