import { describe, it, expect } from "vitest";
import { BoardValue } from "../types";
import { isBoardHasEmptyCell, getGameOverMessage, getMoveData, createEmptyBoard } from "../game-logic";
import { COLS, ROWS } from "../consts";

describe('game-logic', () => {
    describe('isWinMove', () => {
        it('победа в 1 столбце по вертикали', () => {
            const board: BoardValue = [
                [1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [2, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ]
            board[0][3] = 1
            const result = getMoveData(board, 0, 3, ROWS, COLS)
            expect(result).toEqual({ isWinMove: true, position: [[3, 0], [2, 0], [1, 0], [0, 0]] })
        })
        // добавить еще тесты для  isWinMove
    })

    describe('getGameOverMessage', () => {
        it('в функцию пришли мwinner = null и isDraw = false', () => {
            const winner = null
            const isDraw = false
            const message = getGameOverMessage(winner, isDraw)
            expect(message).toEqual('Что-то пошло не так(')
        })
        // добавить еще тесты для getGameOverMessage
    })

    describe('boardHasEmptyCell', () => {
        it('поле не имеет свободных ячеек', () => {
            const board = [
                [1, 2, 1, 2, 1, 2],
                [1, 1, 2, 2, 1, 2],
                [1, 2, 1, 2, 1, 2],
                [1, 2, 1, 2, 1, 2],
                [1, 2, 1, 2, 1, 2],
                [1, 2, 1, 2, 1, 2],
                [1, 2, 1, 2, 1, 2]
            ]
            const result = isBoardHasEmptyCell(board)
            expect(result).toEqual(false)
        })
        it('поле имеет свободную ячейку', () => {
            const board = [
                [1, 2, 1, 2, 1, 2],
                [1, 1, 2, 2, 1, 2],
                [1, 2, 1, 2, 1, 2],
                [1, 2, 1, 2, 1, 2],
                [1, 2, 1, 0, 1, 2],
                [1, 2, 1, 2, 1, 2],
                [1, 2, 1, 2, 1, 2]
            ]
            const result = isBoardHasEmptyCell(board)
            expect(result).toEqual(true)
        })
    })

    describe('createEmptyBoard', () => {
        it('создание пустого поля 6 на 7', () => {
            const result = createEmptyBoard(7, 6)
            expect(result).toEqual([
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0]
            ])
        })
    })


})