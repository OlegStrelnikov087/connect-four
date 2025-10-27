
import './App.css'
import { Board } from '../Board/Board'
import { getGameOverModalMessage } from '../../game-logic'
import { useGameLogic } from '../../hooks/useGameLogic'
import { GameStatus } from '../../enums'
import { Modal } from '../Modal/Modal'
import React, { useEffect, useState } from 'react'
function App() {
  const {
    board,
    gameStatus,
    currentPlayerId,
    players,
    winner,
    isDraw,
    winPosition,
    onCellClick,
    startGameHandler,
    restartGame,
    exitGame
  } = useGameLogic()

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (gameStatus === GameStatus.Over) {
      const timer = setTimeout(() => {
        setShowModal(true)
      }, 3000)

      return () => clearTimeout(timer)
    } else {
      setShowModal(false)
    }
  }, [gameStatus])
  
  return (
    <>
      {gameStatus === GameStatus.Waiting && (
        <div className="waitingGameBlock">
          <h1>Приветсвуем в игре "Четыре в ряд"</h1>
          <button onClick={startGameHandler} className='btn'>Начать игру</button>
        </div>
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
              <Board
                board={board}
                onCellClick={onCellClick}
                winPosition={winPosition}
                playerColors={players.map(player => player.color)}
              />
            </div>
          </div>
        )}
      {showModal && (
        <Modal message={getGameOverModalMessage(winner, isDraw)} restartGame={restartGame} />
      )}
    </>
  )
}

export default App
