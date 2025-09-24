interface NavBarProps {
    isPlaying: boolean;
    onPlayPause?: () => void;
    onReset?: () => void;
    onSettings?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ isPlaying, onPlayPause, onReset, onSettings }) => {
    const handlePlayPause = () => {
        onPlayPause?.();
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