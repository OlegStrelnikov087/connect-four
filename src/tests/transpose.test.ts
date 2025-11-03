import { expect, describe, it } from "vitest"
import { transpose } from "../game-logic"

describe('transpose', () => {
    it('транспонирование матрицы (в нашем случае поля) 6 x 7 в 7 x 6', () => {
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