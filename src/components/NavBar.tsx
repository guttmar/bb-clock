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
        <nav className="w-full flex justify-between gap-4 p-4 bg-gray-700">
            <button className="px-4 py-2 text-base w-24 rounded" onClick={onReset}>
                Reset
            </button>
            <button className="px-4 py-2 text-base w-24 rounded" onClick={handlePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button className="px-4 py-2 text-base w-24 rounded" onClick={onSettings}>
                Settings
            </button>
        </nav>
    );
};

export default NavBar;