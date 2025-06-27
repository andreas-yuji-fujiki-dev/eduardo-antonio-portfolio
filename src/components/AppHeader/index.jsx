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
    <header className="flex">
      <h1 className="">
        &lt;&gt;.edu&lt;/&gt;
      </h1>

      <div className="">
        <nav>
          <ul className="">
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
          onClick={toggleTheme}
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          className=""
        >
          {isDarkMode ? (
            <GoSun className="" />
          ) : (
            <FaRegMoon className="" />
          )}
        </button>
      </div>
    </header>
  );
}