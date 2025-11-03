import React from "react";
import { Cell } from "../Cell/Cell";
import { BoardValue } from "../../types";
import './Board.css'
import { transpose } from "../../game-logic";
import { ChipColors } from "../../enums";
interface BoardProps {
    board: BoardValue,
    winPosition?: number[][],
    playerColors: ChipColors[]
    onCellClick: (colId: number, isActive: boolean) => void,
    isActive: boolean
}
export const Board: React.FC<BoardProps> = ({
    board,
    winPosition = [],
    playerColors,
    onCellClick,
    isActive
}) => {

    const isWinningCell = (colId: number, rowId: number): boolean => {
        return winPosition.some(([winRow, winCol]) => winRow === rowId && winCol === colId);
    };
    return (
        <div className="board">
            {board && transpose(board).map((col, colId) => (
                <div className="col" id={`${colId}`} key={colId}>
                    {col.map((_, rowId) => (
                        <Cell
                            key={`${colId}-${rowId}`}
                            colId={colId}
                            rowId={rowId}
                            isWinningCell={isWinningCell(colId, rowId)}
                            playerColors={playerColors}
                            board={board}
                            onCellClick={onCellClick}
                            isActive={isActive} />
                    ))}
                </div>
            ))}
        </div>
    )
}

