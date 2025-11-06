import { useGame } from '../../hooks/useGame.ts';
import './StartScreen.css'

/**
 * Компонент стартового экрана игры "Четыре в ряд"
 * 
 * @component
 * @returns {JSX.Element} Отрисованный стартовый экран
 */
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
