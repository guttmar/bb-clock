import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SettingsPageProps {
  turnTime: number;
  setTurnTime: (time: number) => void;
  poolTime: number;
  setPoolTime: (time: number) => void;
}

export default function SettingsPage({ turnTime, setTurnTime, poolTime, setPoolTime }: SettingsPageProps) {
  const [turnSeconds, setTurnSeconds] = useState(turnTime / 1000);
  const [poolSeconds, setPoolSeconds] = useState(poolTime / 1000);
  const navigate = useNavigate();

  const handleSave = () => {
    setTurnTime(turnSeconds * 1000);
    setPoolTime(poolSeconds * 1000);
    navigate("/");
  };

  return (
    <div className="settings flex flex-col h-full w-full">
        <h2>Settings</h2>
        <label>
            Turn Time (seconds):
            <input
            type="number"
            value={turnSeconds}
            onChange={(e) => setTurnSeconds(Number(e.target.value))}
            min={1}
            />
        </label>
        <label>
            Pool Time (seconds):
            <input
            type="number"
            value={poolSeconds}
            onChange={(e) => setPoolSeconds(Number(e.target.value))}
            min={0}
            />
        </label>
        <div className="settings-buttons flex flex-row justify-center gap-6 mt-6">
        <button
            className="px-6 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 transition"
            onClick={handleSave}
        >
            Save
        </button>
        <button
            className="px-6 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-600 transition"
            onClick={() => navigate("/")}
        >
            Cancel
        </button>
        </div>
    </div>
  );
}
