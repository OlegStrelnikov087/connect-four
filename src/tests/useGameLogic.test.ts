import { describe, it, expect } from "vitest";
import { renderHook, act } from '@testing-library/react'
import { useGameLogic } from "../hooks/useGameLogic.ts"; 
import { GameStatus } from "../enums";
import { getEmptyBoard, INITIAL_PLAYERS } from "../consts";

const emptyBoard = getEmptyBoard()

describe('useGameLogic', () => {
    describe('startGameHandler', () => {
        it('начало игры', () => {
            const { result } = renderHook(() => useGameLogic()) 
            act(() => {
                result.current.startGameHandler()
            })
            expect(result.current.gameStatus).toEqual(GameStatus.Pending)
        })
    })

    describe('onCellClick', () => {
        it('ход в первую колонку', () => {
            const { result } = renderHook(() => useGameLogic()) 

            act(() => {
                result.current.startGameHandler()
            })

            act(() => {
                result.current.onCellClick(0, true)
            })

            const board = result.current.board
            const currentPlayer = result.current.currentPlayer
            expect(board[5][0] !== 0 && currentPlayer === INITIAL_PLAYERS[1]).toEqual(true)
        })
    })

    describe('restartGameHandler', () => {
        it("начать игру заново после хода в первый столбец", () => {
            const { result } = renderHook(() => useGameLogic()) 

            act(() => {
                result.current.startGameHandler()
            })

            act(() => {
                result.current.onCellClick(0, true)
            })

            act(() => {
                result.current.restartGameHandler()
            })
            expect(result.current.board).toEqual(emptyBoard)
            expect(result.current.gameStatus === GameStatus.Pending
                && result.current.currentPlayer === INITIAL_PLAYERS[0]
                && result.current.isDraw === false
                && result.current.winner === null
                && result.current.winPosition.length === 0).toEqual(true)
        })
    })

    describe('exitGameHandler', () => {
        it('выход из незавершенной игры', () => {
            const { result } = renderHook(() => useGameLogic()) 

            act(() => {
                result.current.startGameHandler()
            })

            act(() => result.current.exitGameHandler())

            expect(result.current.board).toEqual(emptyBoard)
            expect(result.current.gameStatus === GameStatus.Waiting
                   && result.current.currentPlayer === INITIAL_PLAYERS[0] && !result.current.isDraw &&
                   result.current.winner === null
                   && result.current.winPosition.length === 0).toEqual(true)
        })

        it('выход из завершенной игры (победил игрок 1)', () => {
            const { result } = renderHook(() => useGameLogic()) 

            act(() => {
                result.current.startGameHandler()
            })

            const winningMoves = [0, 1, 0, 1, 0, 1, 0]; // Игрок 1 выигрывает
            
            winningMoves.forEach((col) => {
                act(() => {
                    result.current.onCellClick(col, true);
                });
            });

            expect(result.current.gameStatus).toBe(GameStatus.Over);
            expect(result.current.winner).toBe(INITIAL_PLAYERS[0]);

            act(() => result.current.exitGameHandler())

            expect(result.current.board).toEqual(emptyBoard)
            expect(result.current.gameStatus).toBe(GameStatus.Waiting)
            expect(result.current.currentPlayer).toBe(INITIAL_PLAYERS[0])
            expect(result.current.isDraw).toBe(false)
            expect(result.current.winner).toBe(null)
            expect(result.current.winPosition.length).toBe(0)
        })

        it('выход из завершенной игры (победил игрок 2)', () => {
            const { result } = renderHook(() => useGameLogic()) 
        
            act(() => {
                result.current.startGameHandler()
            })
        
            // Игрок 2 выигрывает по вертикали в колонке 1
            // Ходы: 0,1,0,1,0,1,2,1 (последний ход игрока 2 в колонку 1 завершает победу)
            const winningMoves = [0, 1, 0, 1, 0, 1, 2, 1];
            
            winningMoves.forEach((col) => {
                act(() => {
                    result.current.onCellClick(col, true);
                });
            });
        
            expect(result.current.gameStatus).toBe(GameStatus.Over);
            expect(result.current.winner).toBe(INITIAL_PLAYERS[1]); // Игрок 2 победил
        
            act(() => result.current.exitGameHandler())
        
            expect(result.current.board).toEqual(emptyBoard)
            expect(result.current.gameStatus).toBe(GameStatus.Waiting)
            expect(result.current.currentPlayer).toBe(INITIAL_PLAYERS[0])
            expect(result.current.isDraw).toBe(false)
            expect(result.current.winner).toBe(null)
            expect(result.current.winPosition.length).toBe(0)
        })

        
    })
})