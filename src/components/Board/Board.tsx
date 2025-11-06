import React, { useMemo } from 'react';
import { useGame } from '../../hooks/useGame.ts';
import { Cell } from "../Cell/Cell";
import { BoardValue } from "../../utils/types.ts";
import './Board.css'
import { transpose } from "../../utils/game-logic.ts";
import { ChipColors, GameStatus } from '../../utils/enums.ts';

interface BoardProps {
    board: BoardValue,
    winPosition?: number[][],
    playerColors: ChipColors[]
    onCellClick: (colId: number, isActive: boolean) => void,
    isActive: boolean
}

/**
 * Свойства компонента игрового поля
 * 
 * @interface BoardProps
 * @property {BoardValue} board - Текущее состояние игрового поля
 * @property {number[][]} [winPosition=[]] - Координаты выигрышной комбинации [row, col][]
 * @property {ChipColors[]} playerColors - Массив цветов игроков
 * @property {function} onCellClick - Обработчик клика по ячейке
 * @property {number} onCellClick.colId - Индекс колонки
 * @property {boolean} onCellClick.isActive - Флаг активности поля
 * @property {boolean} isActive - Флаг, разрешены ли клики по полю
 */
export const Board: React.FC<BoardProps> = ({
    board,
    winPosition = [],
    playerColors,
    onCellClick,
    isActive
}) => {
    const { gameStatus } = useGame();

    /**
     * 
     * @param {number} colId  - индекс колонки
     * @param {number} rowId  - индекс строки
     * @returns {boolean} - если ячейка победная то правда, если нет, то ложь
     */
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
