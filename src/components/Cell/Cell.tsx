import React from 'react';
import './Cell.css';
import { CellValue, ChipColors } from '../../utils/enums';

/**
 * Свойства компонента ячейки игрового поля
 * 
 * @interface CellProps
 * @property {number} rowId - Идентификатор строки (для ключей или отладки)
 * @property {boolean} [isWinningCell=false] - Флаг, является ли ячейка частью выигрышной комбинации
 * @property {ChipColors[]} playerColors - Массив цветов игроков [игрок1, игрок2]
 * @property {CellValue} value - Текущее значение ячейки (пустая, игрок1, игрок2)
 */
export interface CellProps {
  rowId: number,
  isWinningCell?: boolean,
  playerColors: ChipColors[],
  value: CellValue
}

/**
 * Компонент ячейки игрового поля для игры "Четыре в ряд"
 * 
 * @component
 * @param {CellProps} props - Свойства компонента
 * @returns {JSX.Element} Визуальное представление ячейки
 */
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