import React from "react"
import type { CellValue } from "../../types"
import './Cell.css'
interface CellProps {
    colId: number,
    rowId: number,
    value: CellValue,
    onClick: () => void,
    isWinningCell?: boolean
}

export const Cell: React.FC<CellProps> = ({ colId, rowId, value, onClick, isWinningCell = false }) => {
    const isOccupiedCell = value !== 0
    return (
        <div
            id={`cell${colId}-${rowId}`}
            // className={`cell ${isOccupiedCell ? 'occupied' : ''}`}
            className={`cell ${isOccupiedCell ? 'occupied' : ''} ${isWinningCell ? 'winning-cell' : ''}`}
            data-value={value}
            onClick={onClick}
        >
            {isOccupiedCell && (
                <div className="cell-chip" />
            )}
        </div>
    )
}