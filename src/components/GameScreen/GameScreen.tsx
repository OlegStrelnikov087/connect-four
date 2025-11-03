import React, { useEffect, useMemo, useState } from "react";
import { Board } from "../Board/Board";
import { BoardValue, Player } from "../../types";
import { GameStatus } from "../../enums";
import { initialPlayers } from "../../consts";
import { getGameOverMessage } from "../../game-logic";
import { Modal } from "../Modal/Modal";

interface GameScreenProps {
    restartGameHandler: () => void,
    exitGameHandler: () => void,
    currentPlayer: Player,
    board: BoardValue,
    winPosition: [number, number][],
    onCellClick: (colId: number, isActive: boolean) => void,
    gameStatus: GameStatus,
    winner: Player | null,
    isDraw: boolean
}
export const GameScreen: React.FC<GameScreenProps> = ({
    restartGameHandler,
    exitGameHandler,
    currentPlayer,
    board,
    winPosition,
    onCellClick,
    gameStatus,
    winner,
    isDraw
}) => {

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

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const message = useMemo(() => getGameOverMessage(winner, isDraw), [winner, isDraw]);

    return (
        <div className="gameBlock">
            <div className="gameStatusMenu">
                <button className='btn' onClick={restartGameHandler}>Заново</button>
                <button className='btn' onClick={exitGameHandler}>Выйти</button>
            </div>
            <div className="gameContainer">

                {gameStatus === GameStatus.Pending && (
                    <h1 className='playerMoveMessage'>{`Ходит ${currentPlayer.name}`}</h1>
                )}
                {gameStatus === GameStatus.Over && (
                    <h1>{getGameOverMessage(winner, isDraw)}</h1>
                )}

                <Board
                    board={board}
                    winPosition={winPosition}
                    playerColors={initialPlayers.map(player => player.color)}
                    onCellClick={onCellClick}
                    isActive={gameStatus !== GameStatus.Over}
                />
            </div>

            <Modal
                message={message}
                onClose={handleCloseModal}
                isOpen={showModal}
            />
        </div>
    )
}