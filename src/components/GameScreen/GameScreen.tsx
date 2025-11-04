import { FC, JSX } from 'react';
import { GameStatus } from '../../enums';
import { useGame } from '../../hooks/useGame.ts';
import { usePlayerColors } from '../../hooks/usePlayerColors.ts';
import { Board } from '../Board/Board';
import { GameLayout } from '../GameLayout/GameLayout.tsx';
import { SetupGame } from '../SetupGame/SetupGame.tsx';

export const GameScreen: FC = (): JSX.Element => {
    const {
        gameStatus,
        winPosition,
        board,
        onCellClick,
        players
    } = useGame();

    const { player1, player2 } = usePlayerColors();
    const playerColors = [player1.color, player2.color];

    return (
        <GameLayout>
            {gameStatus === GameStatus.Waiting && (
                <SetupGame />
            )}
            {gameStatus !== GameStatus.Waiting && (
                <Board
                    board={board}
                    winPosition={winPosition}
                    playerColors={playerColors}
                    onCellClick={onCellClick}
                    isActive={gameStatus === GameStatus.Pending}
                />
            )}

        </GameLayout>
    );

};
