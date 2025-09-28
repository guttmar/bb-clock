import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ClockPage from './pages/ClockPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const [turnTime, setTurnTime] = useState(2 * 60 * 1000); // 2 minutes
  const [poolTime, setPoolTime] = useState(5 * 60 * 1000); // 5 minutes

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ClockPage turnTime={turnTime} poolTime={poolTime} />} />
        <Route
          path="/settings"
          element={<SettingsPage turnTime={turnTime} setTurnTime={setTurnTime} poolTime={poolTime} setPoolTime={setPoolTime} />}
        />
      </Routes>
    </Router>
  );
}
