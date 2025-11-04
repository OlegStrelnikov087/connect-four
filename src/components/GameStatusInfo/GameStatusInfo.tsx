import { GameStatus } from "../../enums";
import { getGameOverMessage } from "../../game-logic";
import { useGame } from "../../hooks/useGame";
import './GameStatusInfo.css'

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