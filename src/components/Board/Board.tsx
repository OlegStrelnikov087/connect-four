import React from "react";
import { Cell } from "../Cell/Cell";
import { BoardValue } from "../../types";
import './Board.css'
import { GameStatus } from "../../enums";
interface BoardProps {
    board: BoardValue,
    onCellClick: (colId: number) => void,
    winPosition?: number[][],
    playerColors: string[][],
    gameStatus?: GameStatus
}

export const Board: React.FC<BoardProps> = ({
    board,
    onCellClick,
    winPosition = [],
    playerColors,
    gameStatus = GameStatus.Pending
}) => {

    const isWinningCell = (colId: number, rowId: number): boolean => {
        return winPosition.some(([winCol, winRow]) => winCol === colId && winRow === rowId)
    };

    const isGameOver = gameStatus === GameStatus.Over

    return (
        <div className="board">
            {board && board.map((col, colId) => (
                <div id={`col${colId}`} key={colId} className="col">
                    {col.map((value, rowId) => (
                        <Cell
                            key={`${colId}-${rowId}`}
                            colId={colId}
                            rowId={rowId}
                            value={value}
                            onClick={() => !isGameOver && onCellClick(colId)}
                            isWinningCell={isWinningCell(colId, rowId)}
                            playerColors={playerColors}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

