import { BoardValue } from '../utils/types.ts';
import { getMoveData } from '../logic/game-logic.ts';
import { describe, it, expect } from 'vitest';

describe('getMoveData', () => {
    describe('Горизонтальная победа', () => {
        it('победа игрока по горизонтали с крайней левой ячейки', () => {
            const board: BoardValue = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 0, 0, 0]
            ];

            const result = getMoveData(board, 3, 5);

            expect(result.isWinMove).toBe(true);
            expect(result.position).toHaveLength(4);
            expect(result.position).toEqual([
                [5, 0], [5, 1], [5, 2], [5, 3]
            ]);
        });

        it('победа игрока по горизонтали с крайней правой ячейки', () => {
            const board: BoardValue = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 2, 2, 2, 2]
            ];

            const result = getMoveData(board, 6, 5);

            expect(result.isWinMove).toBe(true);
            expect(result.position).toEqual([[5, 3], [5, 4], [5, 5], [5, 6]]);
        });

        it('победа игрока по горизонтали в середине строки', () => {
            const board: BoardValue = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 1, 0, 0]
            ];

            const result = getMoveData(board, 3, 5);

            expect(result.isWinMove).toBe(true);
            expect(result.position).toEqual([[5, 1], [5, 2], [5, 3], [5, 4]]);
        });
    });

    describe('Вертикальная победа', () => {
        it('победа по вертикали в первой колонке с нижней строки', () => {
            const board: BoardValue = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0]
            ];

            const result = getMoveData(board, 0, 2);

            expect(result.isWinMove).toBe(true);
            expect(result.position).toEqual([
                [2, 0], [3, 0], [4, 0], [5, 0]
            ]);
        });

        it('победа по вертикали в первой колонке начиная со второй строки', () => {
            const board: BoardValue = [
                [0, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0],
                [2, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0]
            ];

            const result = getMoveData(board, 0, 1);

            expect(result.isWinMove).toBe(true);
            expect(result.position).toEqual([[1, 0], [2, 0], [3, 0], [4, 0]])
        });
    });

    describe('Диагональная победа ', () => {
        it('победа по диагонали снизу вверх', () => {
            const board: BoardValue = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 0],
                [0, 1, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0]
            ];

            const result = getMoveData(board, 0, 5);

            expect(result.isWinMove).toBe(true);
            expect(result.position).toEqual([
                [5, 0], [4, 1], [3, 2], [2, 3]
            ]);
        });

        it('победа по диагонали сверху вниз', () => {
            const board: BoardValue = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 2, 0, 0, 0, 0],
                [0, 0, 0, 2, 0, 0, 0],
                [0, 0, 0, 0, 2, 0, 0],
                [0, 0, 0, 0, 0, 2, 0]
            ];

            const result = getMoveData(board, 4, 4);

            expect(result.isWinMove).toBe(true);
            expect(result.position).toEqual([[2, 2], [3, 3], [4, 4], [5, 5]])
        });
    });

    describe('Игра не завершилась победой или больше 4 фишек подряд', () => {
        it('все ячейки пустые', () => {
            const board: BoardValue = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0]
            ];

            const result = getMoveData(board, 0, 0);

            expect(result.isWinMove).toBe(false);
            expect(result.position).toHaveLength(0);
        });

        it('только три ячейки по горизонтали заполнены фишками со значением 1', () => {
            const board: BoardValue = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 0, 0, 0, 0]
            ];

            const result = getMoveData(board, 2, 5);

            expect(result.isWinMove).toBe(false);
            expect(result.position).toHaveLength(0);
        });

        it('больше 4 фишек подряд по горизонтали', () => {
            const board: BoardValue = [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 0, 0]
            ];

            const result = getMoveData(board, 2, 5);

            expect(result.isWinMove).toBe(true);
            expect(result.position).toHaveLength(5); 
        });

    });
});
