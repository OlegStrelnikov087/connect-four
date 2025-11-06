import { COLS, ROWS } from "../utils/consts"
import { CellValue } from "../utils/enums"
import type { BoardValue, Player } from "../utils/types"

/**
 * Анализирует последний ход и проверяет, является ли он победным
 * 
 * @param {BoardValue} newBoard - текущее состояние игрового поля
 * @param {number} lastMoveCol - колонка последнего хода
 * @param {number} lastMoveRow - строка последнего хода
 * @returns {{ isWinMove: boolean, position: [number, number][] }} Объект с результатом проверки:
 * - isWinMove: true если ход победный, false есил нет
 * - position: массив координат выигрышной комбинации
 */
export const getMoveData = (
    newBoard: BoardValue, 
    lastMoveCol: number, 
    lastMoveRow: number
): { isWinMove: boolean, position: [number, number][] } => {
    const playerValue = newBoard[lastMoveRow][lastMoveCol];
    if (playerValue === CellValue.EmptyCell) return { isWinMove: false, position: [] };

    const directions = [
        [0, 1],   // горизонталь
        [1, 0],   // вертикаль
        [1, 1],   // диагональ \
        [1, -1]   // диагональ /
    ];

    for (const [dx, dy] of directions) {
        let count = 1;
        const positions: [number, number][] = [[lastMoveRow, lastMoveCol]];

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
 * Транспонирует матрицу игрового поля (меняет строки и колонки местами)
 * 
 * @param {BoardValue} board - исходное игровое поле
 * @returns {BoardValue} транспонированное игровое поле
 */
export const transpose = (board: BoardValue): BoardValue => {
    const result: BoardValue = Array.from({ length: COLS }, () => Array(ROWS).fill(CellValue.EmptyCell))
    for (let row = 0; row < ROWS; ++row)
        for (let col = 0; col < COLS; ++col)
            result[col][row] = board[row][col];
    return result;
};

/**
 * Находит ближайшую свободную ячейку в указанной колонке
 * 
 * @param {BoardValue} board - игровое поле
 * @param {number} col - индекс колонки для поиска
 * @returns {number | null} индекс строки свободной ячейки или null если колонка заполнена
 * 
 * @remarks
 * Поиск ведется снизу вверх (от индекса ROWS-1 до 0)
 */
export const getNearestEmptyRowIdInColumn = (board: BoardValue, col: number): number | null => {
    for (let row = ROWS - 1; row >= 0; row--)
        if (board[row][col] === CellValue.EmptyCell) return row;
    return null;
}

/**
 * Выполняет ход игрока на игровом поле
 * 
 * @param {BoardValue} board - игровое поле
 * @param {CellValue.Player1 | CellValue.Player2} chip - значение фишки игрока
 * @param {number} rowId - индекс строки
 * @param {number} colId - индекс колонки
 * @returns {void}
 */
export const doMove = (
    board: BoardValue, 
    chip: CellValue.Player1 | CellValue.Player2, 
    rowId: number, 
    colId: number
): void => {
    board[rowId][colId] = chip
}

/**
 * Генерирует сообщение о завершении игры
 * 
 * @param {Player | null} winner - победитель или null если нет победителя
 * @param {boolean} isDraw - флаг ничьей
 * @returns {string} текстовое сообщение о результате игры
 * 
 */
export const getGameOverMessage = (winner: Player | null, isDraw: boolean): string => {
    if (winner !== null) return `Победил ${winner.name}. Поздравляем!`
    if (isDraw) return 'Ничья'
    return 'Что-то пошло не так('
}

/**
 * Проверяет наличие свободных ячеек на игровом поле
 * 
 * @param {BoardValue} board - игровое поле
 * @returns {boolean} true если есть хотя бы одна свободная ячейка, false если нету ни одной
 * 
 */
export const isBoardHasEmptyCell = (board: BoardValue): boolean => {
    for (let rowId = ROWS - 1; rowId >= 0; rowId--) {
        for (let colId = 0; colId < COLS - 1; colId++) {
            if (board[rowId][colId] === CellValue.EmptyCell) return true
        }
    }
    return false
}