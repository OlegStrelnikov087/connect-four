export type BoardValue = CellValue[][]
export type CellValue = ChipValues | EmpryCell
export type EmpryCell = 0
export type BoardConfiguration = {
    Row: number,
    Col: number
}

export enum GameStatus {
    Over = 'over',
    Pending = 'pending',
    Waiting = 'waiting'
}

export enum ChipValues {
    Player1 = 1,
    Player2 = 2
}

export enum PlayerTypes {
    User = 'user',
    Bot = 'bot'
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

export type RowsCount = 6
export type ColumnsCount = 7
