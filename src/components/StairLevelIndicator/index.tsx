import { LevelStairIndicatorTypes } from "@/types/components/LevelStairIndicatorTypes";

export default function StairLevelIndicator( { level }: LevelStairIndicatorTypes ){
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
                    ${level >= 1 ? 'bg-white' : 'bg-gray-500 opacity-60'}
                `}
            ></div>
            <div
                className={`
                    w-1.5
                    h-3
                    rounded-full
                    ${level >= 2 ? 'bg-white' : 'bg-gray-500 opacity-60'}
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