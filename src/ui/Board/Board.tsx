import React, { useMemo } from 'react';
import { useGame } from '../../logic/useGame.ts';
import { Cell } from "../Cell/Cell";
import { BoardValue } from "../../utils/types";
import './Board.css'
import { transpose } from "../../logic/game-logic";
import { ChipColors, GameStatus } from '../../utils/enums';

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
    const { gameStatus } = useGame();
    const isWinningCell = (colId: number, rowId: number): boolean => {
        return winPosition.some(([winRow, winCol]) => winRow === rowId && winCol === colId);
    };

    const drawedBoard = useMemo(() => transpose(board), [board])
    const className = gameStatus === GameStatus.Pending ? 'col col-active' : 'col';

    return (
        <div className="board">
            {board && drawedBoard.map((col, colId) => (
                <div className={className} id={`${colId}`} key={colId} onClick={() => onCellClick(colId, isActive)}>
                    {col.map((cellValue, rowId) => (
                        <Cell
                            key={`${colId}-${rowId}`}
                            rowId={rowId}
                            isWinningCell={isWinningCell(colId, rowId)}
                            playerColors={playerColors}
                            value={cellValue}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}
