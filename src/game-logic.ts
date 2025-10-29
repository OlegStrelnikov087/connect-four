import type { BoardValue, MoveData, Player } from "./types"

export const getMoveData = (newBoard: BoardValue, colId: number, rowId: number, ROWS: number, COLS: number): MoveData => {
    if ((rowId + 3) < ROWS) {
        if (newBoard[colId][rowId] === newBoard[colId][rowId + 1] && newBoard[colId][rowId] === newBoard[colId][rowId + 2] && newBoard[colId][rowId] === newBoard[colId][rowId + 3]) return {isWinMove: true, position:[[rowId, colId], [rowId + 1, colId], [rowId + 2, colId], [rowId + 3, colId]]}
        if ((colId + 3) < COLS) {
            if (newBoard[colId][rowId] === newBoard[colId + 1][rowId + 1] && newBoard[colId][rowId] === newBoard[colId + 2][rowId + 2] && newBoard[colId][rowId] === newBoard[colId + 3][rowId + 3]) return {isWinMove: true, position:[[rowId, colId], [rowId + 1, colId = 1], [rowId + 2, colId + 2], [rowId + 3, colId + 3]]}
        }
        if ((colId - 3) >= 0) {
            if (newBoard[colId][rowId] === newBoard[colId - 1][rowId + 1] && newBoard[colId][rowId] === newBoard[colId - 2][rowId + 2] && newBoard[colId][rowId] === newBoard[colId - 3][rowId + 3]) return {isWinMove: true, position:[[rowId, colId], [rowId + 1, colId - 1], [rowId + 2, colId - 2], [rowId + 3, colId - 3]]}
        }
    }
    if ((rowId - 3) >= 0) {
        if (newBoard[colId][rowId] === newBoard[colId][rowId - 1] && newBoard[colId][rowId] === newBoard[colId][rowId - 2] && newBoard[colId][rowId] === newBoard[colId][rowId - 3]) return {isWinMove: true, position:[[rowId, colId], [rowId - 1, colId], [rowId - 2, colId], [rowId - 3, colId]]}
        if ((colId + 3) < COLS) {
            if (newBoard[colId][rowId] === newBoard[colId + 1][rowId - 1] && newBoard[colId][rowId] === newBoard[colId + 2][rowId - 2] && newBoard[colId][rowId] === newBoard[colId + 3][rowId - 3]) return {isWinMove: true, position:[[rowId, colId], [rowId - 1, colId + 1], [rowId - 2, colId + 2], [rowId - 3, colId + 3]]}
        }
        if ((colId - 3) >= 0) {
            if (newBoard[colId][rowId] === newBoard[colId - 1][rowId - 1] && newBoard[colId][rowId] === newBoard[colId - 2][rowId - 2] && newBoard[colId][rowId] === newBoard[colId - 3][rowId - 3]) return {isWinMove: true, position:[[rowId, colId], [rowId - 1, colId - 1], [rowId - 2, colId - 2], [rowId - 3, colId - 3]]}
        }
    }
    if ((colId - 3) >= 0) {
        if (newBoard[colId][rowId] === newBoard[colId - 1][rowId] && newBoard[colId][rowId] === newBoard[colId - 2][rowId] && newBoard[colId][rowId] === newBoard[colId - 3][rowId]) return {isWinMove: true, position:[[rowId, colId], [rowId, colId - 1], [rowId, colId - 2, ], [rowId, colId - 3]]}
    }
    if ((colId + 3) < COLS) {
        if (newBoard[colId][rowId] === newBoard[colId + 1][rowId] && newBoard[colId][rowId] === newBoard[colId + 2][rowId] && newBoard[colId][rowId] === newBoard[colId + 3][rowId]) return {isWinMove: true, position:[[rowId, colId], [rowId + 1, colId], [rowId + 2, colId], [rowId + 3, colId]]}
    }
    return { isWinMove: false, position: []}
}


export const getGameOverMessage = (winner: Player | null, isDraw: boolean): string => {
    if (isDraw) return 'Ничья'
    if (winner !== null) return `Победил игрок ${winner.number}. Поздравляем!`
    return 'Что-то пошло не так('
}

export const isBoardHasEmptyCell = (board: BoardValue): boolean => {
    for (let colId = 0; colId < board.length; colId++) {
        for (let rowId = 0; rowId < board[colId].length; rowId++) {
            if (board[colId][rowId] === 0) return true
        }
    }

    return false
}

export const createEmptyBoard = (cols: number, rows: number): BoardValue => {
    return Array.from({ length: cols }, () => Array(rows).fill(0))
}
