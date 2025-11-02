import React from "react"
import './Cell.css'
import { BoardValue } from "../../types"
import { CellValue, ChipColors } from "../../enums"
interface CellProps {
    colId: number,
    rowId: number,
    isWinningCell?: boolean,
    playerColors: ChipColors[],
    board: BoardValue,
    onCellClick: (colId: number, isActive: boolean) => void,
    isActive: boolean
}
export const Cell: React.FC<CellProps> = ({
    colId,
    rowId,
    isWinningCell = false,
    playerColors,
    board,
    onCellClick,
    isActive
}) => {

    const value = board[rowId][colId]
    const colorId = value === 1 ? 0 : 1
    const isOccupiedCell = value !== CellValue.EmptyCell
    const cellClassName = `cell ${isOccupiedCell ? 'occupied' : ''} ${isWinningCell ? 'winning-cell' : ''}`
    const chipClassName = `cell-chip ${playerColors[colorId]}`
    return (
        <div className={cellClassName} onClick={() => onCellClick(colId, isActive)} >
            {isOccupiedCell && (
                <div className={chipClassName}></div>
            )}
        </div>
    )
}