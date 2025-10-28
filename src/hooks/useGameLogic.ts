import { useCallback, useEffect, useState } from "react"
import { GameState, Player } from "../types"
import { boardHasEmptyCell, getMoveData } from "../game-logic"
import { COLS, LOCAL_STORAGE_KEY, ROWS, colors } from "../consts"
import { ChipValues, GameStatus, PlayerTypes } from "../enums"

export const useGameLogic = () => {
    const initialPlayers: Player[] = [
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
    ]

    const initialState: GameState = {
        board: Array.from({ length: COLS }, () => Array(ROWS).fill(0)),
        currentPlayerId: 0,
        gameStatus: GameStatus.Waiting,
        players: initialPlayers,
        winner: null,
        isDraw: false,
        winPosition: [],
        steps: []
    }

    const loadGameState = (): GameState | null => {
        try {
            const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
            return saved ? JSON.parse(saved) : null
        } catch (error) {
            console.error('Failed to load game state:', error)
            return null
        }
    }

    const savedState = loadGameState()
    const [gameState, setGameState] = useState<GameState>(savedState || initialState)

    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(gameState))
        } catch (error) {
            console.error('Failed to save game state:', error);
        }
    }, [gameState])

    const { board, currentPlayerId, gameStatus, players, winner, isDraw, winPosition, steps } = gameState

    const updateGameState = useCallback((updates: Partial<GameState>) => {
        setGameState(prev => ({ ...prev, ...updates }))
    }, [])

    const onCellClick = (colId: number) => {
        if (gameStatus !== GameStatus.Pending) return
        const newBoard = [...board]
        for (let i = ROWS - 1; i >= 0; i--) {
            if (newBoard[colId][i] === 0) {
                newBoard[colId][i] = players[currentPlayerId].value
                const newSteps = [...steps, colId]
                const updatedPlayers = [...players]
                updatedPlayers[currentPlayerId] = {
                    ...updatedPlayers[currentPlayerId],
                    steps: [...updatedPlayers[currentPlayerId].steps, [colId, i]]
                }

                const moveResult = getMoveData(newBoard, colId, i, ROWS, COLS)

                if (moveResult.isWinMove) {
                    updateGameState({
                        board: newBoard,
                        steps: newSteps,
                        players: updatedPlayers,
                        winPosition: moveResult.position,
                        winner: players[currentPlayerId],
                        gameStatus: GameStatus.Over
                    });
                    return
                }

                if (!boardHasEmptyCell(newBoard)) {
                    updateGameState({
                        board: newBoard,
                        steps: newSteps,
                        players: updatedPlayers,
                        isDraw: true,
                        gameStatus: GameStatus.Over
                    });
                    return
                }

                updateGameState({
                    board: newBoard,
                    steps: newSteps,
                    players: updatedPlayers,
                    currentPlayerId: (currentPlayerId + 1) % 2
                });
                break
            }
        }
    }

    const startGameHandler = () => {
        if (gameStatus !== GameStatus.Waiting) return
        updateGameState({ gameStatus: GameStatus.Pending })
    }

    const restartGame = () => {
        if (gameStatus === GameStatus.Waiting) return
        const restartState = initialState
        restartState.gameStatus = GameStatus.Pending
        updateGameState(restartState)
    }

    const exitGame = () => {
        if (gameStatus === GameStatus.Waiting) return
        updateGameState(initialState)
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
        exitGame,
        validator
    }
}