import { describe, it, expect } from "vitest";
import { renderHook, act } from '@testing-library/react'
import { useGameLogic } from "../hooks/useGameLogic";
import { GameStatus } from "../enums";
import { getEmptyBoard, initialPlayers } from "../consts";

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
            const currentPlayerId = result.current.currentPlayerId
            expect(board[5][0] !== 0 && currentPlayerId === 1).toEqual(true)
        })
        // добавить еще тестов для разных ходов
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
                && result.current.currentPlayerId === 0
                && result.current.isDraw === false
                && result.current.winner === null
                && result.current.winPosition.length === 0).toEqual(true)
        })
        // добавить тесов
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
                && result.current.currentPlayerId === 0
                && result.current.isDraw === false
                && result.current.winner === null
                && result.current.winPosition.length === 0).toEqual(true)
        })

        it('выход из завершенной игры (победил игрок 1)', () => {
            const { result } = renderHook(() => useGameLogic())

            act(() => {
                result.current.startGameHandler()
            })

            act(() => result.current.winner = initialPlayers[0])

            act(() => result.current.exitGameHandler())

            expect(result.current.board).toEqual(emptyBoard)
            expect(result.current.gameStatus === GameStatus.Waiting
                && result.current.currentPlayerId === 0
                && result.current.isDraw === false
                && result.current.winner === null
                && result.current.winPosition.length === 0).toEqual(true)
        })
        // добавить тесты (выйграл игрок 2, ничья, проверить очистку поля и очистку выйграшных позиций)
    })
})
