import type { BoardValue, Player } from "./types"

export const isWinMove = (newBoard: BoardValue, colId: number, rowId: number, ROWS: number, COLS: number): boolean => {
    if ((rowId + 3) < ROWS) {
        if (newBoard[colId][rowId] === newBoard[colId][rowId + 1] && newBoard[colId][rowId] === newBoard[colId][rowId + 2] && newBoard[colId][rowId] === newBoard[colId][rowId + 3]) return true
        if ((colId + 3) < COLS) {
            if (newBoard[colId][rowId] === newBoard[colId + 1][rowId + 1] && newBoard[colId][rowId] === newBoard[colId + 2][rowId + 2] && newBoard[colId][rowId] === newBoard[colId + 3][rowId + 3]) return true
        }
        if ((colId - 3) >= 0) {
            if (newBoard[colId][rowId] === newBoard[colId - 1][rowId + 1] && newBoard[colId][rowId] === newBoard[colId - 2][rowId + 2] && newBoard[colId][rowId] === newBoard[colId - 3][rowId + 3]) return true
        }
    }
    if ((rowId - 3) >= 0) {
        if (newBoard[colId][rowId] === newBoard[colId][rowId - 1] && newBoard[colId][rowId] === newBoard[colId][rowId - 2] && newBoard[colId][rowId] === newBoard[colId][rowId - 3]) return true
        if ((colId + 3) < COLS) {
            if (newBoard[colId][rowId] === newBoard[colId + 1][rowId - 1] && newBoard[colId][rowId] === newBoard[colId + 2][rowId - 2] && newBoard[colId][rowId] === newBoard[colId + 3][rowId - 3]) return true
        }
        if ((colId - 3) >= 0) {
            if (newBoard[colId][rowId] === newBoard[colId - 1][rowId - 1] && newBoard[colId][rowId] === newBoard[colId - 2][rowId - 2] && newBoard[colId][rowId] === newBoard[colId - 3][rowId - 3]) return true
        }
    }
    if ((colId - 3) >= 0) {
        if (newBoard[colId][rowId] === newBoard[colId-1][rowId] && newBoard[colId][rowId] === newBoard[colId-2][rowId] && newBoard[colId][rowId] === newBoard[colId-3][rowId]) return true
    }
    if ((colId + 3) < COLS) {
        if (newBoard[colId][rowId] === newBoard[colId+1][rowId] && newBoard[colId][rowId] === newBoard[colId+2][rowId] && newBoard[colId][rowId] === newBoard[colId+3][rowId]) return true
    }
    return false
}

export const getGameOverModalMessage = (winner: Player | null, isDraw: boolean): string => {
    if (isDraw) return 'Ничья'
    if (winner !== null) return `Победил игрок ${winner.number}. Поздравляем!`
    return 'Что-то пошло не так('
}

export const boardHasEmptyCell = (board: BoardValue): boolean => {
        for (let colId = 0; colId < board.length; colId++) {
            for (let rowId = 0; rowId < board[colId].length; rowId++) {
                if (board[colId][rowId] === 0) return true
            }            
        }
    return false
}
