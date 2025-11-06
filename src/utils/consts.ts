import { CellValue, ChipColors, PlayerTypes } from "./enums";
import { Player } from "./types";

/**
 * Количество строк игрового поля
 * @constant {number}
 */
export const ROWS = 6;

/**
 * Количество колонок игрового поля
 * @constant {number}
 */
export const COLS = 7;

/**
 * Задержка перед показом модального окна (в миллисекундах)
 * @constant {number}
 */
export const GAME_ALERT_DELAY = 1000;

/**
 * Создает пустое игровое поле заданного размера
 * 
 * @returns {CellValue[][]} Двумерный массив, представляющий пустое игровое поле
 */
export const getEmptyBoard = (): CellValue[][] => { 
    return Array.from({ length: ROWS }, () => Array(COLS).fill(CellValue.EmptyCell)); 
};

/**
 * Начальные настройки игроков по умолчанию
 * 
 * @constant {[Player, Player]}
 * 
 * @type {Player}
 * @property {string} name - Отображаемое имя игрока
 * @property {PlayerTypes} type - Тип игрока (User/Computer)
 * @property {ChipColors} color - Цвет фишек игрока
 * @property {CellValue} value - Значение ячейки для этого игрока
 */
export const initialPlayers: [Player, Player] = [
    {
        name: 'Игрок 1',
        type: PlayerTypes.User,
        color: ChipColors.Red,
        value: CellValue.Player1,
    },
    {
        name: 'Игрок 2',
        type: PlayerTypes.User,
        color: ChipColors.Yellow,
        value: CellValue.Player2,
    }
];