import { useState } from "react"
import { BoardValue, Player } from "../types"
import { isBoardHasEmptyCell, createEmptyBoard, getMoveData } from "../game-logic"
import { COLS, ROWS, colors } from "../consts"
import { ChipValues, GameStatus, PlayerTypes } from "../enums"

export const useGameLogic = () => {
    const [players, setPlayers] = useState<Player[]>([
        {
            name: 'Игрок 1',
            number: 1,
            type: PlayerTypes.User,
            color: colors.red,
            value: ChipValues.Player1,
            steps: []
        },
        {
            name: 'Игрок 2',
            number: 2,
            type: PlayerTypes.User,
            color: colors.yellow,
            value: ChipValues.Player2,
            steps: []
        }
    ])
    const [steps, setSteps] = useState<number[]>([])
    const [winner, setWinner] = useState<Player | null>(null)
    const [currentPlayerId, setCurrentPlayerId] = useState<number>(0)
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Waiting)
    const [board, setBoard] = useState<BoardValue>(Array.from({ length: COLS }, () => Array(ROWS).fill(0)))
    const [isDraw, setIsDraw] = useState<boolean>(false)
    const [winPosition, setWinPosition] = useState<number[][]>([])
    const onCellClick = (colId: number) => {
        if (gameStatus !== GameStatus.Pending) return
        const newBoard = [...board]
        for (let i = ROWS - 1; i >= 0; i--) {
            if (newBoard[colId][i] === 0) {
                newBoard[colId][i] = players[currentPlayerId].value
                setSteps(prev => {
                    return [...prev, colId]
                })
                setPlayers(prevPlayers => {
                    const updatedPlayers = [...prevPlayers]
                    updatedPlayers[currentPlayerId] = {
                        ...updatedPlayers[currentPlayerId],
                        steps: [...updatedPlayers[currentPlayerId].steps, [colId, i]]
                    }
                    return updatedPlayers
                })
                if (getMoveData(newBoard, colId, i, ROWS, COLS).isWinMove) {
                    setWinPosition(getMoveData(newBoard, colId, i, ROWS, COLS).position)
                    setWinner(players[currentPlayerId])
                    setGameStatus(GameStatus.Over)
                    return
                }

                if (!isBoardHasEmptyCell(newBoard)) {
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
        setWinPosition([])
    }

    const exitGame = () => {
        if (gameStatus === GameStatus.Waiting) return
        setBoard(createEmptyBoard(COLS, ROWS));
        setCurrentPlayerId(0);
        setWinner(null);
        setIsDraw(false);
        setGameStatus(GameStatus.Waiting)
        setWinPosition([])
    }

    const validator = (steps: number[]) => {
        let boardState
        if (gameStatus === GameStatus.Over && winner !== null) boardState = 'win'
        else if (gameStatus === GameStatus.Over && isDraw) boardState = 'draw'
        else boardState = gameStatus
        if (boardState !== 'win') {
            return {
                player_1: players[0].steps,
                player_2: players[1].steps,
                board_state: boardState,
            }
        } else {
            return {
                player_1: players[0].steps,
                player_2: players[1].steps,
                board_state: boardState,
                winner: {
                    who: winner!.name,
                    positions: winPosition,
                }
            }
        }
    }

    return {
        board,
        gameStatus,
        currentPlayerId,
        players,
        winner,
        isDraw,
        winPosition,
        onCellClick,
        startGameHandler,
        restartGame,
        exitGame
    }
}