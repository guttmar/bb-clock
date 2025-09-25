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

function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const tenths = Math.floor((ms % 1000) / 100);

  const sStr = seconds.toString();
  const tStr = tenths.toString();

  if (hours > 0) {
    const hStr = hours.toString();
    const mStr = minutes.toString();
    return `${hStr}:${mStr}:${sStr}.${tStr}`;
  } else if (minutes > 0) {
    const mStr = minutes.toString();
    return `${mStr}:${sStr}.${tStr}`;
  } else {
    return `${sStr}.${tStr}`;
  }
}

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
    }, [reset, turnTime, poolTime]);

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
            {formatTime(displayTimeMs)}s
            <br />
            ({formatTime(displayPoolTimeMs)}s)
        </button>
    );
};

export default PlayerClock;