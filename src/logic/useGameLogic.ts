import { BoardValue, GameLogicResult, Player } from '../utils/types';
import { isBoardHasEmptyCell, doMove, getMoveData, getNearestEmptyRowIdInColumn } from '../logic/game-logic';
import { getEmptyBoard, INITIAL_PLAYERS } from '../utils/consts';
import { GameStatus } from '../utils/enums';
import { useState } from 'react';

export const useGameLogic = (): GameLogicResult => {
    const [winner, setWinner] = useState<Player | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<Player>(INITIAL_PLAYERS[0]);
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Waiting);
    const [board, setBoard] = useState<BoardValue>(getEmptyBoard());
    const [isDraw, setIsDraw] = useState<boolean>(false);
    const [winPosition, setWinPosition] = useState<[number, number][]>([]);
    const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);

    // Метод для обновления настроек игроков
    const updatePlayerSettings = (updatedPlayers: Player[]) => {
        setPlayers(updatedPlayers);
        
        // Обновляем currentPlayer если нужно
        if (currentPlayer.value === updatedPlayers[0].value) {
            setCurrentPlayer(updatedPlayers[0]);
        } else if (currentPlayer.value === updatedPlayers[1].value) {
            setCurrentPlayer(updatedPlayers[1]);
        }
        
        // Обновляем winner если нужно
        if (winner && winner.value === updatedPlayers[0].value) {
            setWinner(updatedPlayers[0]);
        } else if (winner && winner.value === updatedPlayers[1].value) {
            setWinner(updatedPlayers[1]);
        }
    };


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

        const newCurrentPlayer = currentPlayer.value === players[0].value ? players[1] : players[0];
        setCurrentPlayer(newCurrentPlayer);
    };

    const startGameHandler = () => {
        setGameStatus(() => GameStatus.Pending);
    };

    const restartGameHandler = () => {
        const newBoard = getEmptyBoard();
        setBoard(newBoard);
        setGameStatus(GameStatus.Pending);
        setCurrentPlayer(players[0]);
        setWinner(null);
        setIsDraw(false);
        setWinPosition([]);
    };

    const exitGameHandler = () => {
        const newBoard = getEmptyBoard();
        setBoard(newBoard);
        setCurrentPlayer(players[0]);
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
        exitGameHandler,
        players,
        updatePlayerSettings
    };
};
