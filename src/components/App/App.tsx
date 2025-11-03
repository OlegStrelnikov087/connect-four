
import './App.css'
import { useGameLogic } from '../../hooks/useGameLogic'
import { GameStatus } from '../../enums'
import React from 'react'
import { StartScreen } from '../StartScreen/StartScreen'
import { GameScreen } from '../GameScreen/GameScreen'
import { initialPlayers } from '../../consts'

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

  return (
    <>
      {gameStatus === GameStatus.Waiting && <StartScreen startGameHandler={startGameHandler} />}
      {gameStatus !== GameStatus.Waiting && <GameScreen
        onCellClick={onCellClick}
        restartGameHandler={restartGameHandler}
        exitGameHandler={exitGameHandler}
        winPosition={winPosition}
        currentPlayer={initialPlayers[currentPlayerId]}
        board={board}
        gameStatus={gameStatus}
        winner={winner}
        isDraw={isDraw}
      />}
    </>
  )
}

export default App
