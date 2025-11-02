import { CellValue, ChipColors, PlayerTypes } from "./enums";
import { Player } from "./types";

export const ROWS = 6
export const COLS = 7

export const getEmptyBoard = () => {return Array.from({ length: ROWS }, () => Array(COLS).fill(CellValue.EmptyCell))}

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