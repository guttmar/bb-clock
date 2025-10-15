import React from "react";
import poolStartSoundFile from "../assets/water.wav";
import turnoverSoundFile from "../assets/whistle.wav";
import styled, { css, keyframes } from "styled-components";

interface PlayerClockProps {
  active: boolean;
  flipped?: boolean;
  onClick?: () => void;
  turnTime: number;
  poolTime: number;
  reset?: boolean;
}

const subtleFlash = keyframes`
  0%, 100% { background-color: #22c55e; }
  50% { background-color: #d1ffe2ff; }
`;

const strongFlash = keyframes`
  0%, 100% { background-color: #22c55e; }
  20% { background-color: #ffffffff; }
  40% { background-color: #f59e0b; }
  60% { background-color: #ffffffff; }
  80% { background-color: #ef4444; }
`;

const ClockButton = styled.button<{
  active: boolean;
  flipped?: boolean;
  animationType?: "subtle" | "strong" | null;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  font-family: "Courier New", monospace;
  font-weight: bold;
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
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

  ${(props) =>
    props.animationType === "subtle" &&
    css`
      animation: ${subtleFlash} 0.8s ease;
    `}
    
  ${(props) =>
    props.animationType === "strong" &&
    css`
      animation: ${strongFlash} 1.2s ease;
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

  const poolAudioRef = React.useRef<HTMLAudioElement | null>(null);
  const turnoverAudioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    poolAudioRef.current = new Audio(poolStartSoundFile);
  }, []);

  React.useEffect(() => {
    turnoverAudioRef.current = new Audio(turnoverSoundFile);
  }, []);

  const prevTurnMsRef = React.useRef<number>(turnTime);
  const prevPoolMsRef = React.useRef<number>(poolTime);

  React.useEffect(() => {
    function signalPool() {
      poolAudioRef.current?.play().catch(console.warn);
      navigator.vibrate?.(100);
      triggerAnimation("subtle");
    }

    function signalTurnover() {
      turnoverAudioRef.current?.play().catch(console.warn);
      navigator.vibrate?.([100, 50, 100, 50, 100]);
      triggerAnimation("strong");
    }

    const turnJustHitZero = prevTurnMsRef.current > 0 && displayTurnMs === 0;
    const poolJustHitZero = prevPoolMsRef.current > 0 && displayPoolMs === 0;

    if (turnJustHitZero) {
      if (displayPoolMs > 0) {
        signalPool();
      } else {
        signalTurnover();
      }
    } else if (poolJustHitZero && displayTurnMs === 0) {
      signalTurnover();
    }

    prevTurnMsRef.current = displayTurnMs;
    prevPoolMsRef.current = displayPoolMs;
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

    const parts: string[] = [];
    if (hours > 0) parts.push(hours.toString().padStart(2, "0"));
    if (hours > 0 || minutes > 0)
      parts.push(minutes.toString().padStart(2, "0"));
    parts.push(seconds.toString() + "." + tenths);

    return parts.join(":");
  };

  const [animationType, setAnimationType] = React.useState<
    "subtle" | "strong" | null
  >(null);

  function triggerAnimation(type: "subtle" | "strong") {
    setAnimationType(type);
    setTimeout(() => setAnimationType(null), 1200); // reset after animation
  }

  return (
    <ClockButton
      active={active}
      flipped={flipped}
      onClick={handleClick}
      animationType={animationType}
    >
      {formatTime(displayTurnMs)}
      <PoolTime>({formatTime(displayPoolMs)})</PoolTime>
    </ClockButton>
  );
}
