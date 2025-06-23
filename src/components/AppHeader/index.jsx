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
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-sm">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        &lt;&gt;.edu&lt;/&gt;
      </h1>

      <div className="flex items-center gap-6">
        <nav>
          <ul className="flex gap-4">
            {HeaderNavPathsJson.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.path}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
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
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isDarkMode ? (
            <GoSun className="w-5 h-5 text-yellow-400" />
          ) : (
            <FaRegMoon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>
    </header>
  );
}