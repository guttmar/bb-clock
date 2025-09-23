import React, { useState } from 'react';

interface NavBarProps {
    onPlayPause?: (isPlaying: boolean) => void;
    onReset?: () => void;
    onSettings?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onPlayPause, onReset, onSettings }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = () => {
        setIsPlaying((prev) => {
            const next = !prev;
            onPlayPause?.(next);
            return next;
        });
    };

    return (
        <nav className="w-full flex justify-between gap-4 p-4 bg-gray-600">
            <button className="px-4 py-2 text-base w-24 rounded border border-gray-300 bg-[#4c4040ff] cursor-pointer" onClick={onReset}>
                Reset
            </button>
            <button className="px-4 py-2 text-base w-24 rounded border border-gray-300 bg-[#4c4040ff] cursor-pointer" onClick={handlePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button className="px-4 py-2 text-base w-24 rounded border border-gray-300 bg-[#4c4040ff] cursor-pointer" onClick={onSettings}>
                Settings
            </button>
        </nav>
    );
};

export default NavBar;