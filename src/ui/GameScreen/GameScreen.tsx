import { FC, JSX } from 'react';
import { GameStatus } from '../../utils/enums.ts';
import { useGame } from '../../logic/useGame.ts';
import { usePlayerColors } from '../../logic/usePlayerColors.ts';
import { Board } from '../Board/Board.tsx';
import { GameLayout } from '../GameLayout/GameLayout.tsx';

/**
 * Основной игровой экран, содержащий игровое поле и управление состоянием игры
 * 
 * @component
 * @returns {JSX.Element} Игровой интерфейс с доской и состоянием игры
 */
export const GameScreen: FC = (): JSX.Element => {
    const {
        gameStatus,
        winPosition,
        board,
        onCellClick
    } = useGame();

    const playerColors = usePlayerColors();

    return (
        <GameLayout>
            <Board
                board={board}
                winPosition={winPosition}
                playerColors={playerColors}
                onCellClick={onCellClick}
                isActive={gameStatus === GameStatus.Pending}
            />
        </GameLayout>
    );

};
