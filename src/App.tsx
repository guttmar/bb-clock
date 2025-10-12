import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ClockPage from './pages/ClockPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const [p1TurnTime, setP1TurnTime] = useState(2 * 60 * 1000); // 2 minutes
  const [p1PoolTime, setP1PoolTime] = useState(5 * 60 * 1000); // 5 minutes
  const [p2TurnTime, setP2TurnTime] = useState(2 * 60 * 1000); // 2 minutes
  const [p2PoolTime, setP2PoolTime] = useState(5 * 60 * 1000); // 5 minutes

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClockPage p1TurnTime={p1TurnTime} p1PoolTime={p1PoolTime} p2TurnTime={p2TurnTime} p2PoolTime={p2PoolTime}/>} />
        <Route
          path="/settings"
          element={<SettingsPage p1TurnTime={p1TurnTime} setP1TurnTime={setP1TurnTime} p1PoolTime={p1PoolTime} setP1PoolTime={setP1PoolTime} p2TurnTime={p2TurnTime} setP2TurnTime={setP2TurnTime} p2PoolTime={p2PoolTime} setP2PoolTime={setP2PoolTime} />}
        />
      </Routes>
    </Router>
  );
}
