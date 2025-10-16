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
  font-size: 2.5rem;
  text-align: center;

  ${(p) =>
    p.active
      ? css`
          background: #22c55e;
          color: #fff;
        `
      : css`
          background: #4b5563;
          color: #e5e7eb;
        `}

  ${(p) =>
    p.flipped &&
    css`
      transform: rotate(180deg);
    `}

  ${(p) =>
    p.animationType === "subtle" &&
    css`
      animation: ${subtleFlash} 0.8s ease;
    `}
  ${(p) =>
    p.animationType === "strong" &&
    css`
      animation: ${strongFlash} 1.2s ease;
    `}
`;

const PoolTime = styled.span`
  font-size: 1rem;
  opacity: 0.7;
`;

function PlayerClock({
  active,
  flipped,
  onClick,
  turnTime,
  poolTime,
  reset,
}: PlayerClockProps) {
  const turnRef = React.useRef(turnTime);
  const poolRef = React.useRef(poolTime);
  const lastRenderRef = React.useRef(0);
  const [, forceRender] = React.useReducer((x) => x + 1, 0);
  const frameRef = React.useRef<number | null>(null);

  const poolAudio = React.useMemo(() => new Audio(poolStartSoundFile), []);
  const turnoverAudio = React.useMemo(() => new Audio(turnoverSoundFile), []);

  const prevTurnRef = React.useRef(turnTime);
  const prevPoolRef = React.useRef(poolTime);
  const [animationType, setAnimationType] = React.useState<
    "subtle" | "strong" | null
  >(null);

  const triggerAnimation = React.useCallback((type: "subtle" | "strong") => {
    setAnimationType(type);
    setTimeout(() => setAnimationType(null), 1200);
  }, []);

  React.useEffect(() => {
    if (!active) return;
    let last = Date.now();

    const loop = () => {
      const now = Date.now();
      const delta = now - last;
      last = now;

      if (turnRef.current > 0) {
        turnRef.current = Math.max(turnRef.current - delta, 0);
      } else {
        poolRef.current = Math.max(poolRef.current - delta, 0);
      }

      const turnJustHitZero =
        prevTurnRef.current > 0 && turnRef.current === 0;
      const poolJustHitZero =
        prevPoolRef.current > 0 && poolRef.current === 0;

      if (turnJustHitZero) {
        if (poolRef.current > 0) {
          poolAudio.play().catch(console.warn);
          navigator.vibrate?.(100);
          triggerAnimation("subtle");
        } else {
          turnoverAudio.play().catch(console.warn);
          navigator.vibrate?.([100, 50, 100, 50, 100]);
          triggerAnimation("strong");
        }
      } else if (poolJustHitZero && turnRef.current === 0) {
        turnoverAudio.play().catch(console.warn);
        navigator.vibrate?.([100, 50, 100, 50, 100]);
        triggerAnimation("strong");
      }

      prevTurnRef.current = turnRef.current;
      prevPoolRef.current = poolRef.current;

      if (now - lastRenderRef.current > 50) {
        lastRenderRef.current = now;
        forceRender();
      }

      frameRef.current = requestAnimationFrame(loop);
    };

    frameRef.current = requestAnimationFrame(loop);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [active, poolAudio, turnoverAudio, triggerAnimation]);

  // reset timers when props change
  React.useEffect(() => {
    turnRef.current = turnTime;
    poolRef.current = poolTime;
    forceRender();
  }, [reset, turnTime, poolTime]);

  const handleClick = () => {
    turnRef.current = turnTime;
    forceRender();
    onClick?.();
  };

  const formatTime = React.useCallback((ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const tenths = Math.floor((ms % 1000) / 100);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${tenths}`;
  }, []);

  return (
    <ClockButton
      active={active}
      flipped={flipped}
      onClick={handleClick}
      animationType={animationType}
    >
      {formatTime(turnRef.current)}
      <PoolTime>({formatTime(poolRef.current)})</PoolTime>
    </ClockButton>
  );
}

export default React.memo(PlayerClock);
