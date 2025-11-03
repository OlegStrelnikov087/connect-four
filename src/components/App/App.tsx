import './App.css';
import { GameScreen } from '../GameScreen/GameScreen';
import { GameProvider } from '../GameProvider/GameProvider.tsx';

export function App() {
  return (
    <GameProvider>
      <GameScreen/>
    </GameProvider>
  );
}
