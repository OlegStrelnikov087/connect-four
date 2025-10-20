import type { CellValue } from "../../types"
import './Cell.css'
interface CellProps {
    colId: number,
    rowId: number,
    value: CellValue,
    onClick: ()=>void
}

export const Cell: React.FC<CellProps> = ({colId, rowId, value, onClick}) => {
    const isOccupiedCell = value !== 0
    return (
        <div 
            id={`cell${colId}-${rowId}`} 
            className={`cell ${isOccupiedCell ? 'occupied' : ''}`}
            data-value={value}
            onClick={onClick}
        >
            {isOccupiedCell && (
                <div className="cell-chip" />
            )}
        </div>
    )
}