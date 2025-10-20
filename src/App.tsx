import './App.css'
import { Board } from './components/Board/Board'
import { getGameOverModalMessage } from './game-logic'
import { useGameLogic } from './hooks/useGameLogic'
import { GameStatus } from './types'
import { Modal } from './components/Modal/Modal'
function App() {
  const {
    board,
    gameStatus,
    currentPlayerId,
    players,
    winner,
    isDraw,
    onCellClick,
    startGameHandler,
    restartGame
  } = useGameLogic()
  return (
    <>
      <button onClick={startGameHandler} className='startGame'>start game</button>
      {gameStatus === GameStatus.Pending &&
        (
          <div className="gameContainer">
            <Board board={board} onCellClick={onCellClick}/>
          </div>
        )}
      {gameStatus === GameStatus.Over && (
        <Modal message={getGameOverModalMessage(winner, isDraw)} restartGame={restartGame} />
      )}
    </>
  )
}

export default App
