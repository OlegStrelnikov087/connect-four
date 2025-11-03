import { BoardValue, GameLogicResult, Player } from '../types';
import { isBoardHasEmptyCell, doMove, getMoveData, getNearestEmptyRowIdInColumn } from '../game-logic';
import { getEmptyBoard, initialPlayers } from '../consts';
import { GameStatus } from '../enums';
import { useState } from 'react';

export const useGameLogic = (): GameLogicResult => {
    const [winner, setWinner] = useState<Player | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<Player>(initialPlayers[0]);
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Waiting);
    const [board, setBoard] = useState<BoardValue>(getEmptyBoard());
    const [isDraw, setIsDraw] = useState<boolean>(false);
    const [winPosition, setWinPosition] = useState<[number, number][]>([]);

    const onCellClick = (colId: number, isActive: boolean) => {
        if (!isActive) return;
        const rowId = getNearestEmptyRowIdInColumn(board, colId);
        if (rowId === null) return;

        doMove(board, currentPlayer.value, rowId, colId);
        setBoard([...board]); // здесь неважна полная глубина копирования, тк нам просто обновить стейт
        const moveRes = getMoveData(board, colId, rowId);

        if (moveRes.isWinMove) {
            setWinner(currentPlayer);
            setGameStatus(GameStatus.Over);
            setWinPosition(moveRes.position);
            return;
        }

        if (!isBoardHasEmptyCell(board)) {
            setIsDraw(true);
            setGameStatus(GameStatus.Over);
            return;
        }

        const newCurrentPlayer = currentPlayer === initialPlayers[0] ? initialPlayers[1] : initialPlayers[0];
        setCurrentPlayer(newCurrentPlayer);
    };

    const startGameHandler = () => {
        setGameStatus(() => GameStatus.Pending);
    };

    const restartGameHandler = () => {
        const newBoard = getEmptyBoard();
        setBoard(newBoard);
        setGameStatus(GameStatus.Pending);
        setCurrentPlayer(initialPlayers[0]);
        setWinner(null);
        setIsDraw(false);
        setWinPosition([]);
    };

    const exitGameHandler = () => {
        const newBoard = getEmptyBoard();
        setBoard(newBoard);
        setCurrentPlayer(initialPlayers[0]);
        setWinner(null);
        setIsDraw(false);
        setGameStatus(GameStatus.Waiting);
        setWinPosition([]);
    };

    return {
        board,
        gameStatus,
        currentPlayer,
        winner,
        isDraw,
        winPosition,
        onCellClick,
        startGameHandler,
        restartGameHandler,
        exitGameHandler
    };
};
