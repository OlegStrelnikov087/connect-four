import { GameStatus } from "../../enums";
import { useGame } from "../../hooks/useGame";

export function GameMenu() {
    const { restartGameHandler, exitGameHandler, gameStatus } = useGame();

    return (
        <div className="gameStatusMenu">
            <button className="btn" onClick={restartGameHandler}>
                {gameStatus === GameStatus.Waiting ? 'Начать игру' : 'Перезапустить'}
            </button>
            {gameStatus !== GameStatus.Waiting && (
                <button className="btn" onClick={exitGameHandler}>
                    Выйти
                </button>
            )}

        </div>
    );
}