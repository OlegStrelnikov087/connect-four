import { useState } from "react"
import { BoardValue, ChipColors, ChipValues, GameStatus, Player, PlayerTypes } from "../types"
import { boardHasEmptyCell, createEmptyBoard, isWinMove } from "../game-logic"

export const useGameLogic = () => {
    const ROWS = 6
    const COLS = 7

    const player1: Player = {
        number: 1,
        type: PlayerTypes.User,
        color: ChipColors.Red,
        value: ChipValues.Player1,
    } 

    const player2: Player = {
        number: 2,
        type: PlayerTypes.User,
        color: ChipColors.Yellow,
        value: ChipValues.Player2,
    } 

    const players: Player[] = [player1, player2]
    const [winner, setWinner] = useState<Player | null>(null)
    const [currentPlayerId, setCurrentPlayerId] = useState<number>(0)
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Waiting)
    const [board, setBoard] = useState<BoardValue>(Array.from({length: COLS}, ()=> Array(ROWS).fill(0)))
    const [isDraw, setIsDraw] = useState<boolean>(false)

    const onCellClick = (colId: number) => {
        if (gameStatus !== GameStatus.Pending) return
        const newBoard = [...board]
        for (let i = ROWS-1; i >= 0; i--) {
            if (newBoard[colId][i] === 0) {
                newBoard[colId][i] = players[currentPlayerId].value
                if (isWinMove(newBoard, colId, i, ROWS, COLS)) {
                    setWinner(players[currentPlayerId])
                    setGameStatus(GameStatus.Over)
                    return
                }
                
                if (!boardHasEmptyCell(newBoard)) {
                    setIsDraw(true)
                    return 
                }
                setCurrentPlayerId((prev) => (prev + 1) % 2)
                setBoard(newBoard)
                break
            }
        }
    }

    const startGameHandler = () => {
        if (gameStatus !== GameStatus.Waiting) return
        setGameStatus(GameStatus.Pending)
    }

    const restartGame = () => {
        if (gameStatus === GameStatus.Waiting) return 
        setBoard(createEmptyBoard(COLS, ROWS));
        setGameStatus(GameStatus.Pending);
        setCurrentPlayerId(0);
        setWinner(null);
        setIsDraw(false);
    }

    const exitGame = () => {
        if (gameStatus === GameStatus.Waiting) return
        setBoard(createEmptyBoard(COLS, ROWS));
        setCurrentPlayerId(0);
        setWinner(null);
        setIsDraw(false); 
        setGameStatus(GameStatus.Waiting)
    }

    return {
        board,
        gameStatus,
        currentPlayerId,
        players,
        winner,
        isDraw,
        onCellClick,
        startGameHandler,
        restartGame,
        exitGame
    }
}