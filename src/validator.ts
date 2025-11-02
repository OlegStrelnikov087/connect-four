import { getEmptyBoard } from "./consts"
import { GameStatus } from "./enums"
import { getMoveData, getNearestEmptyRowIdInColumn, isBoardHasEmptyCell } from "./game-logic"
import { BoardValue } from "./types"

export const validator = (steps: number[]) => {

    const board: BoardValue = getEmptyBoard()
    const player1Steps: [number, number][] = []
    const player2Steps: [number, number][] = []
    let winPositions: [number, number][]
    let boardState: 'win' | GameStatus.Waiting | GameStatus.Pending | 'draw'
    let winner: 'player_1' | 'player_2'
    let result = {
        step_0:
        {
            player_1: [],
            player_2: [],
            board_state: GameStatus.Waiting
        }
    }
    for (let i = 0; i < steps.length; i++) {
        
        const value = i % 2 == 0 ? 1 : 2
        const rowId = getNearestEmptyRowIdInColumn(board, steps[i])

        if (rowId === null) continue

        board[rowId][steps[i]] = value

        if (value === 1) player1Steps.push([rowId, steps[i]])
        else player2Steps.push([rowId, steps[i]])

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