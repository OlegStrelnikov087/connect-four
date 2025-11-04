import { useGame } from '../../hooks/useGame.ts';
import './StartScreen.css'

export const StartScreen = () => {
  const {
    startGameHandler
  } = useGame();

  return (
    <div className="waitingGameBlock">
      <h1>Приветствуем в игре "Четыре в ряд"</h1>
      <button onClick={() => {
        startGameHandler();
      }} className="btn">Начать игру</button>
    </div>
  );
};
