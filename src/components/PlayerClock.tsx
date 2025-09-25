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
    const lastTickRef = React.useRef<number | null>(null);

    // Start/stop timer based on active
    React.useEffect(() => {
        if (active && !intervalRef.current) {
            lastTickRef.current = Date.now();
            intervalRef.current = setInterval(() => {
                if (!lastTickRef.current) return;
                const now = Date.now();
                const delta = Math.floor(now - lastTickRef.current);
                lastTickRef.current = now;

                setDisplayTimeMs(prev => {
                    if (prev > 0) {
                        return Math.max(prev - delta, 0);
                    } else {
                        // turn time expired → burn from pool time
                        setDisplayPoolTimeMs(poolPrev => Math.max(poolPrev - delta, 0));
                        return 0;
                    }
                });
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
        setDisplayTimeMs(turnTime);
        setDisplayPoolTimeMs(poolTime);
    }, [reset]);

    const handlePlayerOneClick = () => {
        setDisplayTimeMs(turnTime);
        lastTickRef.current = Date.now();
        onClick?.();
    }

    return (
        <button onClick={ handlePlayerOneClick }
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