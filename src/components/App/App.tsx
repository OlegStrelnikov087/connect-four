import './App.css'
import { getGameOverMessage } from '../../game-logic'
import { useGameLogic } from '../../hooks/useGameLogic'
import { GameStatus } from '../../enums'
import { Modal } from '../Modal/Modal'
import React, { useEffect, useMemo, useState } from 'react'
import { StartScreen } from '../StartScreen/StartScreen'
import { GameScreen } from '../GameScreen/GameScreen'

function App() {
  const {
    gameStatus,
    winner,
    isDraw,
    winPosition,
    startGameHandler,
    restartGameHandler,
    exitGameHandler,
    currentPlayerId,
    board,
    onCellClick
  } = useGameLogic()

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (gameStatus === GameStatus.Over) {
      const timer = setTimeout(() => {
        setShowModal(true)
      }, 1000) 

      return () => clearTimeout(timer)
    } else {
      setShowModal(false)
    }
  }, [gameStatus])

  const message = useMemo(() => getGameOverMessage(winner, isDraw), [winner, isDraw]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {gameStatus === GameStatus.Waiting && <StartScreen startGameHandler={startGameHandler} />}
      {gameStatus !== GameStatus.Waiting && <GameScreen
        onCellClick={onCellClick}
        restartGameHandler={restartGameHandler}
        exitGameHandler={exitGameHandler}
        winPosition={winPosition}
        currentPlayerId={currentPlayerId}
        board={board}
        gameStatus={gameStatus} />}
      
      <Modal
        message={message}
        onClose={handleCloseModal}
        isOpen={showModal}
      />
    </>
  )
}

export default App
