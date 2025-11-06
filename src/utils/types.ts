import { CellValue, ChipColors, GameStatus, PlayerTypes } from "./enums"

/**
 * Представляет игровое поле как двумерный массив значений ячеек
 * 
 * @typedef {CellValue[][]} BoardValue
 * 
 * @example
 * const board: BoardValue = [
 *   [CellValue.EmptyCell, CellValue.Player1, CellValue.EmptyCell],
 *   [CellValue.Player2, CellValue.Player1, CellValue.EmptyCell]
 * ];
 */
export type BoardValue = CellValue[][]

/**
 * Описывает игрока в игре
 * 
 * @typedef {Object} Player
 * @property {string} name - Отображаемое имя игрока
 * @property {PlayerTypes} type - Тип игрока (человек или бот)
 * @property {CellValue.Player1 | CellValue.Player2} value - Числовое значение игрока на поле
 * @property {ChipColors} color - Цвет фишек игрока
 */
export type Player = {
    name: string,
    type: PlayerTypes,
    value: CellValue.Player1 | CellValue.Player2,
    color: ChipColors
}

/**
 * Результат работы хука useGameLogic - состояние и методы управления игрой
 * 
 * @typedef {Object} GameLogicResult
 * @property {Player} [currentPlayer] - Текущий активный игрок
 * @property {function} onCellClick - Обработчик клика по ячейке
 * @property {number} onCellClick.colId - Индекс колонки
 * @property {boolean} onCellClick.isActive - Флаг активности игрового поля
 * @property {Player | null} winner - Победитель игры или null если игра не завершена
 * @property {function} startGameHandler - Обработчик начала игры
 * @property {GameStatus} gameStatus - Текущий статус игры
 * @property {[number, number][]} winPosition - Координаты выигрышной комбинации
 * @property {function} restartGameHandler - Обработчик перезапуска игры
 * @property {function} exitGameHandler - Обработчик выхода в меню
 * @property {boolean} isDraw - Флаг ничьей
 * @property {BoardValue} board - Текущее состояние игрового поля
 */
export type GameLogicResult = {
    currentPlayer?: Player,
    onCellClick: (colId: number, isActive: boolean) => void,
    winner: Player | null,
    startGameHandler: () => void,
    gameStatus: GameStatus,
    winPosition: [number, number][],
    restartGameHandler: () => void,
    exitGameHandler: () => void,
    isDraw: boolean,
    board: BoardValue,
}