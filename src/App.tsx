import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-col justify-center h-full w-full">
        <div className="flex justify-center items-center w-full">
          <p>Top</p>
        </div>
        <NavBar />
        <div className="flex justify-center items-center w-full">
          <p>Bottom</p>
        </div>
      </div>
    </>
  )
}

export default App
