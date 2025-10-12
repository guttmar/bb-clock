import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface SettingsPageProps {
  turnTime: number;
  setTurnTime: (time: number) => void;
  poolTime: number;
  setPoolTime: (time: number) => void;
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
  turnTime,
  setTurnTime,
  poolTime,
  setPoolTime,
}: SettingsPageProps) {
  const navigate = useNavigate();

  // Convert ms to h/m/s
  const turnHours = Math.floor(turnTime / 3600000);
  const turnMinutes = Math.floor((turnTime % 3600000) / 60000);
  const turnSeconds = Math.floor((turnTime % 60000) / 1000);

  const poolHours = Math.floor(poolTime / 3600000);
  const poolMinutes = Math.floor((poolTime % 3600000) / 60000);
  const poolSeconds = Math.floor((poolTime % 60000) / 1000);

  const [tH, setTH] = useState(turnHours);
  const [tM, setTM] = useState(turnMinutes);
  const [tS, setTS] = useState(turnSeconds);

  const [pH, setPH] = useState(poolHours);
  const [pM, setPM] = useState(poolMinutes);
  const [pS, setPS] = useState(poolSeconds);

  const handleSave = () => {
    setTurnTime((tH * 3600 + tM * 60 + tS) * 1000);
    setPoolTime((pH * 3600 + pM * 60 + pS) * 1000);
    navigate('/');
  };

  return (
    <PageContainer>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Settings</h2>

      <Section>
        <SectionTitle>Turn Time</SectionTitle>
        <InputRow>
          <input type="number" value={tH} min={0} onFocus={e => e.target.select()} onChange={e => setTH(Number(e.target.value))} /> h
          <input type="number" value={tM} min={0} max={59} onFocus={e => e.target.select()} onChange={e => setTM(Number(e.target.value))} /> m
          <input type="number" value={tS} min={0} max={59}  onFocus={e => e.target.select()}onChange={e => setTS(Number(e.target.value))} /> s
        </InputRow>
      </Section>

      <Section>
        <SectionTitle>Pool Time</SectionTitle>
        <InputRow>
          <input type="number" value={pH} min={0} onFocus={e => e.target.select()} onChange={e => setPH(Number(e.target.value))} /> h
          <input type="number" value={pM} min={0} max={59} onFocus={e => e.target.select()} onChange={e => setPM(Number(e.target.value))} /> m
          <input type="number" value={pS} min={0} max={59} onFocus={e => e.target.select()} onChange={e => setPS(Number(e.target.value))} /> s
        </InputRow>
      </Section>

      <ButtonRow>
        <Button bgColor="#22c55e" onClick={handleSave}>Save</Button>
        <Button bgColor="#6b7280" onClick={() => navigate('/')}>Cancel</Button>
      </ButtonRow>
    </PageContainer>
  );
}
