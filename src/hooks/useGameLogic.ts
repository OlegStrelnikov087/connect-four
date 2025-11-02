import { useCallback, useState } from "react"
import { BoardValue, Player } from "../types"
import { isBoardHasEmptyCell, doMove, getMoveData, getNearestEmptyRowIdInColumn } from "../game-logic"
import { getEmptyBoard, initialPlayers } from "../consts"
import { GameStatus, } from "../enums"

export const useGameLogic = () => {
    const [winner, setWinner] = useState<Player | null>(null)
    const [currentPlayerId, setCurrentPlayerId] = useState<number>(0)
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Waiting)
    const [board, setBoard] = useState<BoardValue>(getEmptyBoard())
    const [isDraw, setIsDraw] = useState<boolean>(false)
    const [winPosition, setWinPosition] = useState<[number, number][]>([])

    const onCellClick = (colId: number, isActive: boolean) => {
        if (!isActive) return
        const rowId = getNearestEmptyRowIdInColumn(board, colId)
        if (rowId === null) return
        const newBoard = doMove(board, initialPlayers[currentPlayerId].value, rowId, colId);
        setBoard([...newBoard])
        const moveRes = getMoveData(board, colId, rowId)
        if (moveRes.isWinMove) {
            setWinner(initialPlayers[currentPlayerId])
            setGameStatus(GameStatus.Over)
            setWinPosition(moveRes.position)
            return
        }
        if (!isBoardHasEmptyCell(board)) {
            setIsDraw(true)
            setGameStatus(GameStatus.Over)
            return
        }
        const newCurrentPlayerId = (currentPlayerId + 1) % initialPlayers.length
        setCurrentPlayerId(newCurrentPlayerId)
    }

    const startGameHandler = () => {
        setGameStatus(GameStatus.Pending)        
    }

    const restartGameHandler = useCallback(() => {
        const newBoard = getEmptyBoard()
        setBoard(newBoard);
        setGameStatus(GameStatus.Pending);
        setCurrentPlayerId(0);
        setWinner(null);
        setIsDraw(false);
        setWinPosition([])
    }, [gameStatus])


    const exitGameHandler = () => {
        const newBoard = getEmptyBoard()
        setBoard(newBoard);
        setCurrentPlayerId(0);
        setWinner(null);
        setIsDraw(false);
        setGameStatus(GameStatus.Waiting)
        setWinPosition([])
    }

    return {
        board,
        gameStatus,
        currentPlayerId,
        winner,
        isDraw,
        winPosition,
        onCellClick,
        startGameHandler,
        restartGameHandler,
        exitGameHandler
    }
}