import type { CellValue } from "../types"

interface CellProps {
    colId: number,
    rowId: number,
    value: CellValue,
    onClick: ()=>void
}

export const Cell: React.FC<CellProps> = ({colId, rowId, value, onClick}) => {
    return (
        <div id={`cell${colId}-${rowId}`} className="cell" onClick={onClick}>{value}</div>
    )
}