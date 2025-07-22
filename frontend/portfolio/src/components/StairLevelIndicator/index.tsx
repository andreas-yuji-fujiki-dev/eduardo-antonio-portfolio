"use client";

import { LevelStairIndicatorTypes } from "@/types/components/LevelStairIndicatorTypes";

import { useThemeStore } from "@/stores/themeStore";

export default function StairLevelIndicator( { level }: LevelStairIndicatorTypes ){
    const isDarkTheme = useThemeStore((state) => state.theme === 'dark');

    const stairStepBgColor = isDarkTheme ? 'white' : 'black';

    return (
        <div
            className={`
                flex
                justify-center
                items-end
                gap-0.5 
                h-full
            `}
        >
            <div
                className={`
                    w-1.5
                    h-2
                    rounded-full
                    ${level >= 1 ? `bg-${stairStepBgColor}` : 'bg-gray-500 opacity-60'}
                `}
            ></div>
            <div
                className={`
                    w-1.5
                    h-3
                    rounded-full
                    ${level >= 2 ? `bg-${stairStepBgColor}` : 'bg-gray-500 opacity-60'}
                `}
            ></div>
            <div
                className={`
                    w-1.5
                    h-4
                    rounded-full
                    ${level === 3 ? 'bg-white' : 'bg-gray-500 opacity-60'}
                `}
            ></div>
        </div>
    );
};