import { BoardValue, GameLogicResult, Player } from '../utils/types';
import { isBoardHasEmptyCell, doMove, getMoveData, getNearestEmptyRowIdInColumn } from '../utils/game-logic';
import { getEmptyBoard, initialPlayers } from '../utils/consts';
import { GameStatus } from '../utils/enums';
import { useState } from 'react';

/**
 * Кастомный хук для управления игровой логикой "Четыре в ряд"
 * 
 * @returns {GameLogicResult} Объект с состоянием игры и обработчиками действий
 * 
 */
export const useGameLogic = (): GameLogicResult => {
    const [winner, setWinner] = useState<Player | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<Player>(initialPlayers[0]);
    const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Waiting);
    const [board, setBoard] = useState<BoardValue>(getEmptyBoard());
    const [isDraw, setIsDraw] = useState<boolean>(false);
    const [winPosition, setWinPosition] = useState<[number, number][]>([]);
    /**
     * функция обработчика клика по ячейке
     * @param {number} colId - индекс колонки по которой совершен клик
     * @param {number} isActive - булевое значение, обозначающее активна ли сейчас доска и должен ли обрабатываться клик
     * @returns {void}
     */
    const onCellClick = (colId: number, isActive: boolean) => {
        if (!isActive) return;
        const rowId = getNearestEmptyRowIdInColumn(board, colId);
        if (rowId === null) return;

        doMove(board, currentPlayer.value, rowId, colId);
        setBoard([...board]);
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

    /**
    * Запускает новую игру, меняя статус на "в процессе"
    * 
    * @returns {void}
    */
    const startGameHandler = () => {
        setGameStatus(() => GameStatus.Pending);
    };

    /**
     * Перезапускает текущую игру, сбрасывая состояние до начального
     * но сохраняя настройки игроков
     * 
     * @returns {void}
     */
    const restartGameHandler = () => {
        const newBoard = getEmptyBoard();
        setBoard(newBoard);
        setGameStatus(GameStatus.Pending);
        setCurrentPlayer(initialPlayers[0]);
        setWinner(null);
        setIsDraw(false);
        setWinPosition([]);
    };

    /**
     * Завершает текущую игру и меняет статус на "ожидание" 
     * 
     * @returns {void}
     */
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
