import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ClockPage from './pages/ClockPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  const [turnTime, setTurnTime] = useState(3 * 1000);
  const [poolTime, setPoolTime] = useState(5 * 1000);

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
