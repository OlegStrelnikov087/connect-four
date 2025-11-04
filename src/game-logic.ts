import { COLS, ROWS } from "./consts"
import { CellValue } from "./enums"
import type { BoardValue, Player } from "./types"

export const getMoveData =
    (newBoard: BoardValue, lastMoveCol: number, lastMoveRow: number): { isWinMove: boolean, position: [number, number][] } => {
        const playerValue = newBoard[lastMoveRow][lastMoveCol];
        if (playerValue === CellValue.EmptyCell) return { isWinMove: false, position: [] };

        const directions = [
            [0, 1],
            [1, 0],
            [1, 1],
            [1, -1]
        ];

        for (const [dx, dy] of directions) {
            let count = 1;
            const positions: [number, number][] = [[lastMoveRow, lastMoveCol]];

            // Проверяем в обе стороны от последнего хода
            for (let direction = -1; direction <= 1; direction += 2) {
                for (let i = 1; i < 4; i++) {
                    const step = i * direction;
                    const newRow = lastMoveRow + dx * step;
                    const newCol = lastMoveCol + dy * step;

                    if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS &&
                        newBoard[newRow][newCol] === playerValue) {
                        count++;
                        positions.push([newRow, newCol]);
                    } else {
                        break;
                    }
                }
            }

            if (count >= 4) {

                positions.sort((a, b) => a[1] - b[1]);
                console.log(positions);

                return {
                    isWinMove: true,
                    position: positions
                };
            }
        }

        return { isWinMove: false, position: [] };
    };

/**
 * Транспонирует матрицу
 * @param board
 */
export const transpose = (board: BoardValue): BoardValue => {
    const result: BoardValue = Array.from({ length: COLS }, () => Array(ROWS).fill(CellValue.EmptyCell))
    for (let row = 0; row < ROWS; ++row)
        for (let col = 0; col < COLS; ++col)
            result[col][row] = board[row][col];
    return result;
};

// отдает ближайшую свободную ячейку (индекс) или false если вся колонка занята
// верхняя ячейка = 0, нижняя = ROWS - 1
export const getNearestEmptyRowIdInColumn = (board: BoardValue, col: number): number | null => {
    for (let row = ROWS - 1; row >= 0; row--)
        if (board[row][col] === CellValue.EmptyCell) return row;
    return null;
}

export const doMove = (board: BoardValue, chip: CellValue.Player1 | CellValue.Player2, rowId: number, colId: number): void => {
    board[rowId][colId] = chip
}

export const getGameOverMessage = (winner: Player | null, isDraw: boolean): string => {
    if (winner !== null) return `Победил ${winner.name}. Поздравляем!`
    if (isDraw) return 'Ничья'
    return 'Что-то пошло не так('
}

export const isBoardHasEmptyCell = (board: BoardValue): boolean => {
    for (let rowId = ROWS - 1; rowId >= 0; rowId--) {
        for (let colId = 0; colId < COLS - 1; colId++) {
            if (board[rowId][colId] === CellValue.EmptyCell) return true
        }
    }
    return false
}
