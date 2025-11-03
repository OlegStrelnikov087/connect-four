import { FC, JSX } from 'react';
import { GameStatus } from '../../enums';
import { useGame } from '../../hooks/useGame.ts';
import { usePlayerColors } from '../../hooks/usePlayerColors.ts';
import { Board } from '../Board/Board';
import { GameLayout } from '../GameLayout/GameLayout.tsx';

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
