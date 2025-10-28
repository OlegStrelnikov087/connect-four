import { ChipValues, GameStatus, PlayerTypes } from "./enums"

export type BoardValue = CellValue[][]
export type CellValue = ChipValues | EmpryCell
export type EmpryCell = 0
export type BoardConfiguration = {
    row: number,
    col: number
}

export type Player = {
    name: string,
    number: number,
    type: PlayerTypes,
    value: ChipValues,
    color: string[],
    steps: number[][]
}

export type MoveData = {
    isWinMove: boolean,
    position: [number, number][]
}

export type GameState = {
    board: BoardValue;
    currentPlayerId: number;
    gameStatus: GameStatus;
    players: Player[];
    winner: Player | null;
    isDraw: boolean;
    winPosition: number[][];
    steps: number[];
}

