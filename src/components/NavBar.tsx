import styled from 'styled-components';

interface NavBarProps {
  isPlaying: boolean;
  onReset: () => void;
  onPlayPause: () => void;
  onSettings: () => void;
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem; /* Thick navbar */
  background-color: #1f2937;
  gap: 1rem;
  padding: 0 1rem;
`;

const NavButton = styled.button`
  padding: 1.0rem 1.25rem;
  border-radius: 0.5rem;
  background-color: #374151;
  color: #fff;
  font-weight: 500;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.25);
  transition: background-color 0.2s;

  &:hover {
    background-color: #4b5563;
  }
`;

export default function NavBar({ isPlaying, onReset, onPlayPause, onSettings }: NavBarProps) {
  return (
    <Nav>
      <NavButton onClick={onReset}>Reset</NavButton>
      <NavButton onClick={onPlayPause}>{isPlaying ? 'Pause' : 'Play'}</NavButton>
      <NavButton onClick={onSettings}>Settings</NavButton>
    </Nav>
  );
}
