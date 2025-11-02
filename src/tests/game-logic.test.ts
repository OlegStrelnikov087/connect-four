import { describe, it, expect } from "vitest";
import { doMove, getGameOverMessage, getMoveData, getNearestEmptyRowIdInColumn, isBoardHasEmptyCell, transpose } from "../game-logic";
import { ROWS, initialPlayers } from "../consts";

describe('game-logic', () => {
    describe('transpose', () => {
        it('transpose matrix 6 x 7', () => {
            const board = [
                [0, 1, 2, 3, 4, 5, 6],
                [0, 1, 2, 3, 4, 5, 6],
                [0, 1, 2, 3, 4, 5, 6],
                [0, 1, 2, 3, 4, 5, 6],
                [0, 1, 2, 3, 4, 5, 6],
                [0, 1, 2, 3, 4, 5, 6]
            ]

            const result = transpose(board)

            expect(result).toEqual([
                [0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1],
                [2, 2, 2, 2, 2, 2],
                [3, 3, 3, 3, 3, 3],
                [4, 4, 4, 4, 4, 4],
                [5, 5, 5, 5, 5, 5],
                [6, 6, 6, 6, 6, 6]
            ])
        })
    })

    describe('getNearestEmptyRowIdInColumn', () => {
        it('get the nearest empty cell in full empty column', () => {
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

        it('get the nearest empty cell in full occupied column', () => {
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

        it('get the nearest empty cell in the column in which the first cell will be occupied', () => {
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

        it('get the nearest empty cell in the column in which first and second cell will be occupied', () => {
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

        it('get the nearest empty cell in the column in which first, second and third cell will be occupied', () => {
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

        it('get the nearest empty cell in the column in which first, second, third and fourth cell will be occupied', () => {
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

        it('get the nearest empty cell in column which only first cell is empty', () => {
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

    describe('doMove', () => {
        it('should place move in the last empty cell in first column', () => {
            const board = [
                [0, 0, 1, 2, 1, 2, 1],
                [2, 0, 2, 1, 2, 1, 2],
                [1, 0, 1, 2, 1, 2, 1],
                [2, 0, 2, 1, 2, 1, 2],
                [1, 0, 1, 2, 1, 2, 1],
                [2, 0, 2, 1, 2, 1, 2]
            ]

            const result = doMove(board, 1, 0, 0)

            expect(result).toEqual([
                [1, 0, 1, 2, 1, 2, 1],
                [2, 0, 2, 1, 2, 1, 2],
                [1, 0, 1, 2, 1, 2, 1],
                [2, 0, 2, 1, 2, 1, 2],
                [1, 0, 1, 2, 1, 2, 1],
                [2, 0, 2, 1, 2, 1, 2]
            ])
        })

        it('should place move in the bottom of empty column', () => {
            const board = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ]

            const result = doMove(board, 1, 5, 2)

            expect(result).toEqual([
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0]
            ])
        })

        it('should place move on top of existing chips in column', () => {
            const board = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0]
            ]

            const result = doMove(board, 2, 2, 0)

            expect(result).toEqual([
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0]
            ])
        })

        it('should place move in the middle of partially filled column', () => {
            const board = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0], 
                [1, 0, 0, 0, 0, 0, 0]
            ]

            const result = doMove(board, 1, 4, 0)

            expect(result).toEqual([
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0], 
                [1, 0, 0, 0, 0, 0, 0]
            ])
        })

        it('should handle move in last column', () => {
            const board = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 2],
                [0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 2]
            ]

            const result = doMove(board, 1, 1, 6)

            expect(result).toEqual([
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 2],
                [0, 0, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 2]
            ])
        })

        it('should place player 2 move correctly', () => {
            const board = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ]

            const result = doMove(board, 2, 5, 4)

            expect(result).toEqual([
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 0, 0]
            ])
        })

        it('should handle move in almost full column', () => {
            const board = [
                [0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0]
            ]

            const result = doMove(board, 2, 0, 0)

            expect(result).toEqual([
                [2, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0]
            ])
        })

        it('should handle move in column with gap', () => {
            const board = [
                [0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0]
            ]

            const result = doMove(board, 1, 2, 0)

            expect(result).toEqual([
                [0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0]
            ])
        })

        it('should place move in center column', () => {
            const board = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ]

            const result = doMove(board, 1, 5, 3)

            expect(result).toEqual([
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0]
            ])
        })
    })

    describe('getGameOverMessage', () => {
        it('player1 is winner', () => {
            const result = getGameOverMessage(initialPlayers[0], false)

            expect(result).toEqual(`Победил игрок ${initialPlayers[0].name}. Поздравляем!`)
        })

        it('player1 is winner', () => {
            const result = getGameOverMessage(initialPlayers[1], false)

            expect(result).toEqual(`Победил игрок ${initialPlayers[1].name}. Поздравляем!`)
        })

        it('draw', () => {
            const result = getGameOverMessage(null, true)

            expect(result).toEqual(`Ничья`)
        })

        it('error', () => {
            const result = getGameOverMessage(null, false)

            expect(result).toEqual('Что-то пошло не так(')
        })
    })

    describe('isBoardHasEmptyCell', () => {
        it('board is have not empty cell', () => {
            const board = [
                [1, 1, 1, 2, 1, 2, 1],
                [2, 2, 2, 1, 2, 1, 2],
                [1, 1, 1, 2, 1, 2, 1],
                [2, 2, 2, 1, 2, 1, 2],
                [1, 1, 1, 2, 1, 2, 1],
                [2, 1, 2, 1, 2, 1, 2]
            ]
            const result = isBoardHasEmptyCell(board)

            expect(result).toEqual(false)
        })

        it('board is have empty cell', () => {
            const board = [
                [1, 0, 1, 2, 1, 2, 1],
                [2, 0, 2, 1, 2, 1, 2],
                [1, 0, 1, 2, 1, 2, 1],
                [2, 0, 2, 1, 2, 1, 2],
                [1, 0, 1, 2, 1, 2, 1],
                [2, 0, 2, 1, 2, 1, 2]
            ]

            const result = isBoardHasEmptyCell(board)

            expect(result).toEqual(true)
        })
    })

    describe('getMoveData', () => {
        it('move is not win', () => {
            const board = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0]
            ]

            const result = getMoveData(board, 3, 5)

            expect(result).toEqual({ isWinMove: false, position: [] })
        })
    })

    it('move is win horizontally', () => {
        const board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1]
        ]

        const result = getMoveData(board, 3, 5)

        expect(result).toEqual({ isWinMove: true, position: [[5, 3], [5, 4], [5, 5], [5, 6]] })
    })

    it('move is win diagonal (top-bottom)', () => {
        const board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 1]
        ]

        const result = getMoveData(board, 3, 2)

        expect(result).toEqual({ isWinMove: true, position: [[5, 6], [4, 5], [3, 4], [2, 3]] })
    })

    it('move is win diagonal (bottom->top)', () => {
        const board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0]
        ]

        const result = getMoveData(board, 5, 2)

        expect(result).toEqual({ isWinMove: true, position: [[5, 2], [4, 3], [3, 4], [2, 5]] })
    })

    it('move is win vertically', () => {
        const board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 1]
        ]

        const result = getMoveData(board, 6, 2)

        expect(result).toEqual({ isWinMove: true, position: [[5, 6], [4, 6], [3, 6], [2, 6]] })
    })
})