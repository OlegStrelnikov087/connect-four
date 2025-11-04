import React from 'react';
import './Cell.css';
import { CellValue, ChipColors } from '../../enums';

export interface CellProps {
  rowId: number,
  isWinningCell?: boolean,
  playerColors: ChipColors[],
  value: CellValue
}

export const Cell: React.FC<CellProps> = ({
  isWinningCell = false,
  playerColors,
  value
}) => {

  const colorId = value === 1 ? 0 : 1;
  const isOccupiedCell = value !== CellValue.EmptyCell;
  const cellClassName = `cell ${isOccupiedCell ? 'occupied' : ''} ${isWinningCell ? 'winning-cell' : ''}`;
  const chipClassName = `cell-chip ${playerColors[colorId]}`;
  return (
    <div className={cellClassName}>
      {isOccupiedCell && (
        <div className={chipClassName}></div>
      )}
    </div>
  );
};
