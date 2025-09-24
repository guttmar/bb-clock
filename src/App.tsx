import React from 'react';
import './App.css'
import NavBar from './components/NavBar'
import PlayerClock from './components/PlayerClock'

function App() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [reset, setReset] = React.useState(false);
  const [isPlayerOne, setIsPlayerOne] = React.useState(true);

  const handleReset = () => {
    setReset(true);
    setIsPlaying(false);
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setReset(false);
  }

  const handlePlayerOneClick = () => {
    if (isPlayerOne) {
      setIsPlayerOne(false);
    }

    if (!isPlaying) {
      setIsPlaying(true);
    }
  }

  const handlePlayerTwoClick = () => {
    if (!isPlayerOne) {
      setIsPlayerOne(true);
    }

     if (!isPlaying) {
      setIsPlaying(true);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center h-full w-full">
        <PlayerClock active={isPlayerOne && isPlaying} reset={reset} flipped={true} onClick={handlePlayerOneClick}/>
        <NavBar isPlaying={isPlaying} onPlayPause={handlePlayPause} onReset={handleReset}/>
        <PlayerClock active={!isPlayerOne && isPlaying} reset={reset} onClick={handlePlayerTwoClick} />
      </div>
    </>
  )
}

export default App
