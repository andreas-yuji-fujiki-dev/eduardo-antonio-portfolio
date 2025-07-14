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

      fixed
      top-0
      left-0
      right-0
      z-300
      ${ isDarkMode ? 'bg-black' : 'bg-white' }
      
      h-[60px]
      px-12

      **:transition-all
      **:duration-150
    `}>
      <a href="/">
        <h1 className={`
          text-xl
        `}>
            &lt;/&gt; .edward
        </h1>
      </a>

      <div className={`
        flex
        gap-12
      `}>
        <nav>
          <ul className={`
            flex
            gap-12
          `}>
            {HeaderNavPathsJson.map( ( item, index ) => (
              <li key={ index }>
                <a 
                  href={ item.path }
                >
                  { item.span }
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        <button
          className="
            cursor-pointer
            hover:text-orange-400
          "
          onClick={ toggleTheme }
          aria-label={ isDarkMode ? "Switch to light mode" : "Switch to dark mode" }
        >
          { isDarkMode ? (
            <GoSun />
          ) : (
            <FaRegMoon />
          )}
        </button>
      </div>
    </header>
  );
}