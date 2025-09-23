import './App.css'
import NavBar from './components/NavBar'
import PlayerClock from './components/PlayerClock'

function App() {
  return (
    <>
      <div className="flex flex-col justify-center h-full w-full">
        <PlayerClock active={true} reset={false} flipped={true} />
        <NavBar/>
        <PlayerClock active={false} reset={false} />
      </div>
    </>
  )
}

export default App
