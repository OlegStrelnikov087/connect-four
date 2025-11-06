import './App.css';
import { GameScreen } from '../GameScreen/GameScreen.tsx';
import { GameProvider } from '../GameProvider/GameProvider.tsx';

export function App() {
  return (
    <GameProvider>
      <GameScreen />
    </GameProvider>
  );
}
