import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface SettingsPageProps {
  p1TurnTime: number;
  setP1TurnTime: (time: number) => void;
  p1PoolTime: number;
  setP1PoolTime: (time: number) => void;
  p2TurnTime: number;
  setP2TurnTime: (time: number) => void;
  p2PoolTime: number;
  setP2PoolTime: (time: number) => void;
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 2rem;
  background-color: #1f1f1f;
  color: #fff;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

const InputRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  input {
    width: 4rem;
    padding: 0.25rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    text-align: center;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button<{ bgColor?: string }>`
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  color: #fff;
  background-color: ${(props) => props.bgColor || '#555'};
  box-shadow: 0px 2px 4px rgba(0,0,0,0.3);
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.bgColor ? `${props.bgColor}cc` : '#666'};
  }
`;

export default function SettingsPage({
  p1TurnTime: p1TurnTime,
  setP1TurnTime: setP1TurnTime,
  p1PoolTime: p1PoolTime,
  setP1PoolTime: setP1PoolTime,
  p2TurnTime: p2TurnTime,
  setP2TurnTime: setP2TurnTime,
  p2PoolTime: p2PoolTime,
  setP2PoolTime: setP2PoolTime,
}: SettingsPageProps) {
  const navigate = useNavigate();

  // Convert ms to h/m/s
  const p1TurnHours = Math.floor(p1TurnTime / 3600000);
  const p1TurnMinutes = Math.floor((p1TurnTime % 3600000) / 60000);
  const p1TurnSeconds = Math.floor((p1TurnTime % 60000) / 1000);

  const p1PoolHours = Math.floor(p1PoolTime / 3600000);
  const p1PoolMinutes = Math.floor((p1PoolTime % 3600000) / 60000);
  const p1PoolSeconds = Math.floor((p1PoolTime % 60000) / 1000);

  const p2TurnHours = Math.floor(p2TurnTime / 3600000);
  const p2TurnMinutes = Math.floor((p2TurnTime % 3600000) / 60000);
  const p2TurnSeconds = Math.floor((p2TurnTime % 60000) / 1000);

  const p2PoolHours = Math.floor(p2PoolTime / 3600000);
  const p2PoolMinutes = Math.floor((p2PoolTime % 3600000) / 60000);
  const p2PoolSeconds = Math.floor((p2PoolTime % 60000) / 1000);

  const [p1tH, setP1TH] = useState(p1TurnHours);
  const [p1tM, setP1TM] = useState(p1TurnMinutes);
  const [p1tS, setP1TS] = useState(p1TurnSeconds);

  const [p1PH, setP1PH] = useState(p1PoolHours);
  const [p1PM, setP1PM] = useState(p1PoolMinutes);
  const [p1PS, setP1PS] = useState(p1PoolSeconds);

  const [p2tH, setP2TH] = useState(p2TurnHours);
  const [p2tM, setP2TM] = useState(p2TurnMinutes);
  const [p2tS, setP2TS] = useState(p2TurnSeconds);

  const [p2PH, setP2PH] = useState(p2PoolHours);
  const [p2PM, setP2PM] = useState(p2PoolMinutes);
  const [p2PS, setP2PS] = useState(p2PoolSeconds);

  const handleSave = () => {
    setP1TurnTime((p1tH * 3600 + p1tM * 60 + p1tS) * 1000);
    setP1PoolTime((p1PH * 3600 + p1PM * 60 + p1PS) * 1000);
    setP2TurnTime((p2tH * 3600 + p2tM * 60 + p2tS) * 1000);
    setP2PoolTime((p2PH * 3600 + p2PM * 60 + p2PS) * 1000);
    navigate('/');
  };

  return (
    <PageContainer>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Settings</h2>

      <Section>
        <SectionTitle>Turn Time</SectionTitle>
        <InputRow>
          <input type="number" value={p1tH} min={0} onFocus={e => e.target.select()} onChange={e => setP1TH(Number(e.target.value))} /> h
          <input type="number" value={p1tM} min={0} max={59} onFocus={e => e.target.select()} onChange={e => setP1TM(Number(e.target.value))} /> m
          <input type="number" value={p1tS} min={0} max={59}  onFocus={e => e.target.select()}onChange={e => setP1TS(Number(e.target.value))} /> s
        </InputRow>
      </Section>

      <Section>
        <SectionTitle>Pool Time</SectionTitle>
        <InputRow>
          <input type="number" value={p1PH} min={0} onFocus={e => e.target.select()} onChange={e => setP1PH(Number(e.target.value))} /> h
          <input type="number" value={p1PM} min={0} max={59} onFocus={e => e.target.select()} onChange={e => setP1PM(Number(e.target.value))} /> m
          <input type="number" value={p1PS} min={0} max={59} onFocus={e => e.target.select()} onChange={e => setP1PS(Number(e.target.value))} /> s
        </InputRow>
      </Section>

      <Section>
        <SectionTitle>P2 Turn Time</SectionTitle>
        <InputRow>
          <input type="number" value={p2tH} min={0} onFocus={e => e.target.select()} onChange={e => setP2TH(Number(e.target.value))} /> h
          <input type="number" value={p2tM} min={0} max={59} onFocus={e => e.target.select()} onChange={e => setP2TM(Number(e.target.value))} /> m
          <input type="number" value={p2tS} min={0} max={59}  onFocus={e => e.target.select()}onChange={e => setP2TS(Number(e.target.value))} /> s
        </InputRow>
      </Section>

      <Section>
        <SectionTitle>P2 Pool Time</SectionTitle>
        <InputRow>
          <input type="number" value={p2PH} min={0} onFocus={e => e.target.select()} onChange={e => setP2PH(Number(e.target.value))} /> h
          <input type="number" value={p2PM} min={0} max={59} onFocus={e => e.target.select()} onChange={e => setP2PM(Number(e.target.value))} /> m
          <input type="number" value={p2PS} min={0} max={59} onFocus={e => e.target.select()} onChange={e => setP2PS(Number(e.target.value))} /> s
        </InputRow>
      </Section>

      <ButtonRow>
        <Button bgColor="#22c55e" onClick={handleSave}>Save</Button>
        <Button bgColor="#6b7280" onClick={() => navigate('/')}>Cancel</Button>
      </ButtonRow>
    </PageContainer>
  );
}
