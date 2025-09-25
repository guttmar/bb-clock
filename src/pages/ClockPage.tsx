import React from 'react';
import NavBar from '../components/NavBar';
import PlayerClock from '../components/PlayerClock';
import useWakeLock from '../hooks/useWakeLock';
import { useNavigate } from 'react-router-dom';

interface ClockPageProps {
  turnTime: number;
  poolTime: number;
}

export default function ClockPage({ turnTime, poolTime }: ClockPageProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [reset, setReset] = React.useState(false);
  const [isPlayerOne, setIsPlayerOne] = React.useState(true);

  useWakeLock(isPlaying);

  const navigate = useNavigate();

  const handleReset = () => {
    setReset(true);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setReset(false);
  };

  const handlePlayerOneClick = () => {
    if (isPlayerOne) setIsPlayerOne(false);
    if (!isPlaying) setIsPlaying(true);
  };

  const handlePlayerTwoClick = () => {
    if (!isPlayerOne) setIsPlayerOne(true);
    if (!isPlaying) setIsPlaying(true);
  };

  return (
    <div className="flex flex-col justify-center h-full w-full">
      <PlayerClock
        active={isPlayerOne && isPlaying}
        reset={reset}
        flipped={true}
        onClick={handlePlayerOneClick}
        turnTime={turnTime}
        poolTime={poolTime}
      />
      <NavBar
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onReset={handleReset}
        onSettings={() => navigate("/settings")}
      />
      <PlayerClock
        active={!isPlayerOne && isPlaying}
        reset={reset}
        onClick={handlePlayerTwoClick}
        turnTime={turnTime}
        poolTime={poolTime}
      />
    </div>
  );
}
