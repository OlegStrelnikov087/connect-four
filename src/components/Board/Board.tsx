import React from "react";
import { Cell } from "../Cell/Cell";
import { BoardValue } from "../../types";
import './Board.css'
interface BoardProps {
    board: BoardValue,
    onCellClick: (colId: number)=> void,
    winPosition?: number[][]
}
export const Board: React.FC<BoardProps> = ({
    board,
    onCellClick,
    winPosition = []
}) => {

    const isWinningCell = (colId: number, rowId: number): boolean => {
        return winPosition.some(([winCol, winRow]) => winCol === colId && winRow === rowId);
    };

    return (
        <div className="board">
            {board && board.map((col, colId) => (
                <div id={`col${colId}`} key={colId} className="col">
                    {col.map((value, rowId) => (
                        <Cell key={`${colId}-${rowId}`} colId={colId} rowId={rowId} value={value} onClick={() => onCellClick(colId)} isWinningCell={isWinningCell(colId, rowId)}/>
                    ))}
                </div>
            ))}
        </div>
    )
}

