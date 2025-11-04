import { expect, describe, it } from "vitest"
import { getNearestEmptyRowIdInColumn } from "../game-logic"
import { ROWS } from "../consts"

describe('getNearestEmptyRowIdInColumn', () => {
    it('поиск rowId первой свободной ячейки в первой колонке полностью пустого поля', () => {
        const board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ]

        const colId = 0
        const result = getNearestEmptyRowIdInColumn(board, colId)

        expect(result).toEqual(ROWS - 1)
    })

    it('поиск первой свободной ячейки в полностью заполненной колонке', () => {
        const board = [
            [1, 0, 1, 2, 1, 2, 1],
            [2, 0, 2, 1, 2, 1, 2],
            [1, 0, 1, 2, 1, 2, 1],
            [2, 0, 2, 1, 2, 1, 2],
            [1, 0, 1, 2, 1, 2, 1],
            [2, 0, 2, 1, 2, 1, 2]
        ]

        const colId = 0
        const result = getNearestEmptyRowIdInColumn(board, colId)

        expect(result).toEqual(null)
    })

    it('поиск первой свободной ячейки в колонке, где самая нижняя ячейка занята, а остальные свободны', () => {
        const board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0]
        ]

        const colId = 0
        const result = getNearestEmptyRowIdInColumn(board, colId)

        expect(result).toEqual(4)
    })

    it('поиск первой свободной ячейки в колонке, где первые две нижние ячейки уже заполнены, а остальные свободны', () => {
        const board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0]
        ]

        const colId = 0
        const result = getNearestEmptyRowIdInColumn(board, colId)

        expect(result).toEqual(3)
    })

    it('поиск первой свободной ячейки в колонке, где первые три нижние ячейки уже заполнены, а остальные свободны', () => {
        const board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0]
        ]

        const colId = 0
        const result = getNearestEmptyRowIdInColumn(board, colId)

        expect(result).toEqual(2)
    })

    it('поиск первой свободной ячейки в колонке, где первые четыре нижние ячейки уже заполнены, а остальные свободны', () => {
        const board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0]
        ]

        const colId = 0
        const result = getNearestEmptyRowIdInColumn(board, colId)

        expect(result).toEqual(1)
    })

    it('поиск первой свободной ячейки в колонке, где свободна только самая верхняя ячейка', () => {
        const board = [
            [0, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0]
        ]

        const colId = 0
        const result = getNearestEmptyRowIdInColumn(board, colId)

        expect(result).toEqual(0)
    })
})
