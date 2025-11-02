import React from "react";
import { Board } from "../Board/Board";
import { BoardValue } from "../../types";
import { GameStatus } from "../../enums";
import { initialPlayers } from "../../consts";
interface GameScreenProps {
    restartGameHandler: () => void,
    exitGameHandler: () => void,
    currentPlayerId: number,
    board: BoardValue,
    winPosition: [number, number][],
    onCellClick: (colId: number, isActive: boolean) => void,
    gameStatus: GameStatus
}
export const GameScreen: React.FC<GameScreenProps> = ({
    restartGameHandler,
    exitGameHandler,
    currentPlayerId,
    board,
    winPosition,
    onCellClick,
    gameStatus
}) => {

    return (
        <div className="gameBlock">
            <div className="gameStatusMenu">
                <button className='btn' onClick={restartGameHandler}>Заново</button>
                <button className='btn' onClick={exitGameHandler}>Выйти</button>
            </div>
            <div className="gameContainer">
                <h1 className='playerMoveMessage'>{`Ходит ${initialPlayers[currentPlayerId].name}`}</h1>
                <Board
                    board={board}
                    winPosition={winPosition}
                    playerColors={initialPlayers.map(player => player.color)}
                    onCellClick={onCellClick}
                    isActive={gameStatus !== GameStatus.Over}
                />
            </div>
        </div>
    )
}