import React from "react"
import type { CellValue } from "../../types"
import './Cell.css'
interface CellProps {
    colId: number,
    rowId: number,
    value: CellValue,
    onClick: () => void,
    isWinningCell?: boolean,
    playerColors: string[][],
}
export const Cell: React.FC<CellProps> = ({ colId, rowId, value, onClick, isWinningCell = false, playerColors }) => {
    const isOccupiedCell = value !== 0

    const getChipColors = (): { primary: string; secondary: string } => {
        if (value === 1 && playerColors[0]) {
            return {
                primary: playerColors[0][0],
                secondary: playerColors[0][1]
            };
        } else if (value === 2 && playerColors[1]) {
            return {
                primary: playerColors[1][0],
                secondary: playerColors[1][1]
            };
        }

        return {
            primary: '',
            secondary: ''
        };
    };

    const colors = getChipColors();

    return (
        <div
            id={`cell${colId}-${rowId}`}
            className={`cell ${isOccupiedCell ? 'occupied' : ''} ${isWinningCell ? 'winning-cell' : ''}`}
            data-value={value}
            onClick={onClick}
        >
            {isOccupiedCell && (
                <div className="cell-chip"
                    style={{
                        '--chip-color': colors.primary,
                        '--chip-dark-color': colors.secondary
                    } as React.CSSProperties} />
            )}
        </div>
    )
}