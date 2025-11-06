import { getEmptyBoard } from "./consts"
import { GameStatus } from "./enums"
import { getMoveData, getNearestEmptyRowIdInColumn, isBoardHasEmptyCell } from "./game-logic"
import { BoardValue } from "./types"

/**
 * Информация о победителе игры
 */
interface WinnerInfo {
    who: 'player_1' | 'player_2';
    positions: [number, number][];
}

/**
 * Результат одного шага игры
 */
interface StepResult {
    player_1: [number, number][];
    player_2: [number, number][];
    board_state: 'win' | GameStatus.Waiting | GameStatus.Pending | 'draw';
    winner?: WinnerInfo;
}

/**
 * Результат валидации всей последовательности ходов
 * Ключи в формате `step_${number}` содержат состояние после каждого хода
 */
interface ValidationResult {
    [key: `step_${number}`]: StepResult;
}

/**
 * Валидирует последовательность ходов для игры "Четыре в ряд"
 * 
 * @param {number[]} steps - Массив номеров колонок (0-6), куда игроки делают ходы
 * @returns {ValidationResult} Объект с историей состояния игры после каждого хода
 * 
 * @remarks
 * Игроки ходят по очереди: player_1 (нечетные индексы), player_2 (четные индексы)
 */
export const validator = (steps: number[]) => {

    const board: BoardValue = getEmptyBoard()
    let player1Steps: [number, number][] = []
    let player2Steps: [number, number][] = []
    let winPositions: [number, number][]
    let boardState: 'win' | GameStatus.Waiting | GameStatus.Pending | 'draw'
    let winner: 'player_1' | 'player_2'
    let result: ValidationResult = {
        step_0:
        {
            player_1: [],
            player_2: [],
            board_state: GameStatus.Waiting
        }
    }

    if (steps.length === 0) return result

    for (let i = 0; i < steps.length; i++) {

        const value = i % 2 == 0 ? 1 : 2
        const rowId = getNearestEmptyRowIdInColumn(board, steps[i])

        if (rowId === null) continue

        board[rowId][steps[i]] = value

        if (value === 1) {
            player1Steps = [...player1Steps, [rowId, steps[i]]]
        } else {
            player2Steps = [...player2Steps, [rowId, steps[i]]]
        }

        const stepData = getMoveData(board, steps[i], rowId)
        if (stepData.isWinMove) {
            winPositions = stepData.position
            boardState = 'win'
            winner = `player_${value}`

            result[`step_${i + 1}`] = {
                player_1: player1Steps,
                player_2: player2Steps,
                board_state: boardState,
                winner: {
                    who: winner,
                    positions: winPositions
                }
            }
        } else if (!isBoardHasEmptyCell(board)) {
            boardState = 'draw'
            result[`step_${i + 1}`] = {
                player_1: player1Steps,
                player_2: player2Steps,
                board_state: boardState
            }
        } else {
            result[`step_${i + 1}`] = {
                player_1: player1Steps,
                player_2: player2Steps,
                board_state: GameStatus.Pending

            }
        }

    }

    return result

}