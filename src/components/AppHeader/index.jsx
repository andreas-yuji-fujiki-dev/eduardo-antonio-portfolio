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
      
      h-[60px]
      px-12

      **:transition-all
      **:duration-500
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
            {HeaderNavPathsJson.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.path}
                  className=""
                >
                  {item.span}
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
          onClick={toggleTheme}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <GoSun />
          ) : (
            <FaRegMoon />
          )}
        </button>
      </div>
    </header>
  );
}