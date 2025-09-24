import React from 'react';

interface PlayerClockProps {
    active: boolean;
    flipped?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    turnTime: number;
    poolTime: number;
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

const PlayerClock: React.FC<PlayerClockProps & { reset: boolean }> = ({ active, reset, flipped, onClick, turnTime, poolTime }) => {
    const [displayTimeMs, setDisplayTimeMs] = React.useState(turnTime);
    const [displayPoolTimeMs, setDisplayPoolTimeMs] = React.useState(poolTime);
    const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

    // Start/stop timer based on active
    React.useEffect(() => {
        if (active) {
            const startTime = Date.now();
            intervalRef.current = setInterval(() => {
                const elapsed = Math.floor(Date.now() - startTime);

                const displayTime = turnTime - elapsed;
                setDisplayTimeMs(displayTime > 0 ? displayTime : 0);

                if (displayTime <= 0) {
                    const poolElapsed = elapsed - turnTime;
                    const displayPoolTime = displayPoolTimeMs - poolElapsed;
                    setDisplayPoolTimeMs(displayPoolTime > 0 ? displayPoolTime : 0);
                }
            }, 100);
        } else if (intervalRef.current) {
            setDisplayTimeMs(turnTime);
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
        setDisplayTimeMs(turnTime);
        setDisplayPoolTimeMs(poolTime);
    }, [reset]);

    return (
        <button onClick={ onClick }
            style={{
            ...(active ? activeStyle : inactiveStyle),
            ...(flipped ? { transform: 'rotate(180deg)' } : {}),
            }}
        >
            {(displayTimeMs / 1000).toFixed(1)}s
            <br />
            ({(displayPoolTimeMs / 1000).toFixed(1)}s)
        </button>
    );
};

export default PlayerClock;