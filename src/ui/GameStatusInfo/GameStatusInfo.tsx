import { GameStatus } from "../../utils/enums";
import { getGameOverMessage } from "../../logic/game-logic";
import './GameStatusInfo.css'
import { useGame } from "../../logic/useGame";

/**
 * Компонент для отображения текущего статуса игры и информации о ходе
 * 
 * @component
 * @returns {JSX.Element | null} Элемент с информацией о статусе игры или null
 */
export const GameStatusInfo = () => {
    const { currentPlayer, gameStatus, winner, isDraw } = useGame();
    if (!currentPlayer) {
        return <></>;
    }
    if (gameStatus === GameStatus.Pending) {
        return (<h1 className="playerMoveMessage">{`Ходит ${currentPlayer.name}`}</h1>
        );
    }
    if (gameStatus === GameStatus.Over) {
        return (<h1 className="playerMoveMessage">{getGameOverMessage(winner, isDraw)}</h1>
        );
    }
};