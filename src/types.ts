import { ChipValues, PlayerTypes } from "./enums"

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
    position: [number, number][] //[rowId, colId]
}

