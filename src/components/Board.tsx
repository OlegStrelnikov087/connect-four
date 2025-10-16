import type React from "react";
import { ChipValues, type BoardValue, type Player, PlayerTypes, ChipColors, GameStatus } from "../types";
import { useState } from "react";
import { Cell } from "./Cell";
import { isWinMove } from "../game-logic";

export const Board: React.FC = () => {
    const COLS = 7
    const ROWS = 6
    const player1: Player = { type: PlayerTypes.User, color: ChipColors.Red, value: ChipValues.Player1 }
    const player2: Player = { type: PlayerTypes.User, color: ChipColors.Blue, value: ChipValues.Player2 }
    const players: Player[] = [player1, player2]
    const [currentPlayer, setCurrentPlayer] = useState<number>(0)
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Pending)
        // [0, 0, 0, 0, 0, 0,], // col
        // [0, 0, 0, 0, 0, 0,],
        // [0, 0, 0, 0, 0, 0,],
        // [0, 0, 0, 0, 0, 0,],
        // [0, 0, 0, 0, 0, 0,],
        // [0, 0, 0, 0, 0, 0,],
        // [0, 0, 0, 0, 0, 0,]
        // //row
    const [board, setBoard] = useState<BoardValue>(Array.from({length: COLS}, ()=> Array(ROWS).fill(0)))

    const onClick = (chipValue: ChipValues, colId: number) => {
        if (gameStatus !== GameStatus.Pending) return 
        const newBoard = [...board]
        let chosedCell = null
        for (let i = ROWS; i >= 0; i--) {
            if (newBoard[colId][i] === 0) {
                chosedCell = newBoard[colId][i]
                newBoard[colId][i] = chipValue
                const newCurrentPlayer = (currentPlayer + 1) % 2
                setCurrentPlayer(newCurrentPlayer)
                setBoard(newBoard)
                // проверка на победу
                if (isWinMove(newBoard, colId, i, ROWS, COLS)) setGameStatus(GameStatus.Over)
                break
            }
        }

        if (chosedCell === null) { console.log('Этот столбец уже заполнен! Выберите другой столбец для хода.') } // можно вывести ошибку
    }

    return (
        <div className="board">
            {board && board.map((col, colId) => (
                <div id={`col${colId}`} key={colId} className="col">
                    {col.map((value, rowId) => (
                        <Cell key={rowId + colId} colId={colId} rowId={rowId} value={value} onClick={() => onClick(players[currentPlayer].value, colId)} />
                    ))}
                </div>
            ))}
        </div>
    )
}

