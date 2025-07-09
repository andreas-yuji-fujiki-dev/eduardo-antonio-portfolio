import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", 
    "./app/**/*.{js,ts,jsx,tsx}",  
    "./pages/**/*.{js,ts,jsx,tsx}", 
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
      fontFamily: {
        sugarpunch: ['var(--font-sugarpunch)', 'sans-serif'],
      },
    },
  },
  plugins: [
    function(pluginApi: any) {
      pluginApi.addUtilities({
        '.font-sugarpunch': {
          fontFamily: 'var(--font-sugarpunch), sans-serif !important',
        },
      });
    }
  ],
};

export default config;