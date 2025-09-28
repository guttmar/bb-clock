import React from 'react';
import poolStartSoundFile from '../assets/water.wav';
import styled, { css } from 'styled-components';

interface PlayerClockProps {
  active: boolean;
  flipped?: boolean;
  onClick?: () => void;
  turnTime: number;
  poolTime: number;
  reset?: boolean;
}

const ClockButton = styled.button<{ active: boolean; flipped?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  transition: background 0.3s;

  ${(props) =>
    props.active
      ? css`
          background: #22c55e;
          color: #fff;
        `
      : css`
          background: #4b5563;
          color: #e5e7eb;
        `}

  ${(props) =>
    props.flipped &&
    css`
      transform: rotate(180deg);
    `}

  font-size: 2.5rem;
  text-align: center;
`;

const PoolTime = styled.span`
  font-size: 1rem;
  opacity: 0.7;
`;

export default function PlayerClock({
  active,
  flipped,
  onClick,
  turnTime,
  poolTime,
  reset,
}: PlayerClockProps) {
  const [displayTurnMs, setDisplayTurnMs] = React.useState(turnTime);
  const [displayPoolMs, setDisplayPoolMs] = React.useState(poolTime);

  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const lastTickRef = React.useRef<number | null>(null);

  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    audioRef.current = new Audio(poolStartSoundFile);
  }, []);

  const prevTurnMsRef = React.useRef<number>(turnTime);

  React.useEffect(() => {
    if (
      prevTurnMsRef.current > 0 &&
      displayTurnMs === 0 &&
      displayPoolMs > 0
    ) {
      audioRef.current?.play().catch(console.warn);
    }
    prevTurnMsRef.current = displayTurnMs;
  }, [displayTurnMs, displayPoolMs]);


  React.useEffect(() => {
    setDisplayTurnMs(turnTime);
    setDisplayPoolMs(poolTime);
  }, [reset, turnTime, poolTime]);

  // Start/stop timer
  React.useEffect(() => {
    if (active && !intervalRef.current) {
      lastTickRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        if (!lastTickRef.current) return;
        const now = Date.now();
        const delta = now - lastTickRef.current;
        lastTickRef.current = now;

        setDisplayTurnMs((prev) => {
          if (prev > 0) return Math.max(prev - delta, 0);
          setDisplayPoolMs((poolPrev) => Math.max(poolPrev - delta, 0));
          return 0;
        });
      }, 100);
    } else if (!active && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active]);

  // Reset timer
  React.useEffect(() => {
    setDisplayTurnMs(turnTime);
    setDisplayPoolMs(poolTime);
  }, [reset, turnTime, poolTime]);

  const handleClick = () => {
    setDisplayTurnMs(turnTime);
    lastTickRef.current = Date.now();
    onClick?.();
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const tenths = Math.floor((ms % 1000) / 100);

    let parts: string[] = [];
    if (hours > 0) parts.push(hours.toString().padStart(2, '0'));
    if (hours > 0 || minutes > 0) parts.push(minutes.toString().padStart(2, '0'));
    parts.push(seconds.toString() + '.' + tenths);

    return parts.join(':');
  };

  return (
    <ClockButton active={active} flipped={flipped} onClick={handleClick}>
      {formatTime(displayTurnMs)}
      <PoolTime>({formatTime(displayPoolMs)})</PoolTime>
    </ClockButton>
  );
}
