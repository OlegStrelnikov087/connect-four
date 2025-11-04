import { CellValue, ChipColors, GameStatus, PlayerTypes } from "./enums"

export type BoardValue = CellValue[][]

export type Player = {
    name: string,
    type: PlayerTypes,
    value: CellValue.Player1 | CellValue.Player2,
    color: ChipColors
}

export type GameHistory = {
    stepsColumnId: number[],
    player1StepsCoordinates: [number, number][],
    player2StepsCoordinates: [number, number][],
    winCellsCoordinates: [number, number][]
}

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

