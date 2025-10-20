import type React from "react";
import { Cell } from "../Cell/Cell";
import { BoardValue } from "../../types";
import './Board.css'
interface BoardProps {
    board: BoardValue,
    onCellClick: (colId: number)=> void,
}
export const Board: React.FC<BoardProps> = ({
    board,
    onCellClick,
}) => {
    return (
        <div className="board">
            {board && board.map((col, colId) => (
                <div id={`col${colId}`} key={colId} className="col">
                    {col.map((value, rowId) => (
                        <Cell key={`${colId}-${rowId}`} colId={colId} rowId={rowId} value={value} onClick={() => onCellClick(colId)} />
                    ))}
                </div>
            ))}
        </div>
    )
}

