import { describe, it, expect } from "vitest";
import { isBoardHasEmptyCell } from "../logic/game-logic";

describe('isBoardHasEmptyCell', () => {
    it('игровое поле не имеет свободных ячеек', () => {
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

    it('игровое поле имеет свободные ячейки', () => {
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
