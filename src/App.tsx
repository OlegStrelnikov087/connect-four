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
    restartGame,
    exitGame
  } = useGameLogic()
  return (
    <>
      {gameStatus === GameStatus.Waiting && (
        <button onClick={startGameHandler} className='btn'>Начать игру</button>
      )}
      {gameStatus !== GameStatus.Waiting &&
        (
          <div className="gameBlock">
            <div className="gameStatusMenu">
              <button className='btn' onClick={restartGame}>Заново</button>
              <button className='btn' onClick={exitGame}>Выйти</button>
            </div>
            <div className="gameContainer">
              <h1 className='playerMoveMessage'>{`Ходит игрок ${players[currentPlayerId].number}`}</h1>
              <Board board={board} onCellClick={onCellClick} />
            </div>
          </div>
        )}
      {gameStatus === GameStatus.Over && (
        <Modal message={getGameOverModalMessage(winner, isDraw)} restartGame={restartGame} />
      )}
    </>
  )
}

export default App
