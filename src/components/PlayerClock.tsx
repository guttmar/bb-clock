import React from 'react';

interface PlayerClockProps {
    active: boolean;
    flipped?: boolean;
    children?: React.ReactNode;
}

const activeStyle: React.CSSProperties = {
    background: 'green',
    color: 'white',
    padding: '32px 64px',
    textAlign: 'center',
    fontSize: '2rem',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
};

const inactiveStyle: React.CSSProperties = {
    ...activeStyle,
    background: '#444444ff',
};

const PlayerClock: React.FC<PlayerClockProps & { reset: boolean }> = ({ active, reset, flipped }) => {
    const [milliSeconds, setMilliSeconds] = React.useState(0);
    const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

    // Start/stop timer based on active
    React.useEffect(() => {
        if (active) {
            const startTime = Date.now() - milliSeconds;
            intervalRef.current = setInterval(() => {
                const elapsed = Math.floor(Date.now() - startTime);
                setMilliSeconds(elapsed);
            }, 100);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [active]);

    // Reset timer when reset prop changes
    React.useEffect(() => {
        setMilliSeconds(0);
    }, [reset]);

    return (
        <div
            style={{
            ...(active ? activeStyle : inactiveStyle),
            ...(flipped ? { transform: 'rotate(180deg)' } : {}),
            }}
        >
            {(milliSeconds / 1000).toFixed(1)}s
        </div>
    );
};

export default PlayerClock;