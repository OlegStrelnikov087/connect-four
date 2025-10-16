import './App.css'
import { Board } from './components/Board'
import { useGameLogic } from './hooks/useGameLogic'
import { GameStatus } from './types'

function App() {
  const {
    board,
    gameStatus,
    currentPlayerId,
    players,
    onCellClick,
    startGameHandler
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
        <div>GAME IS OVER!!!</div>
      )}
    </>
  )
}

export default App
