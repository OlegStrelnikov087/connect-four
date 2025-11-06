import { FC, JSX, PropsWithChildren } from "react";
import { GameContext } from "../../logic/useGame";
import { useGameLogic } from "../../logic/useGameLogic";

export const GameProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const gameLogic = useGameLogic();

  return (
    <GameContext.Provider value={gameLogic}>
      {children}
    </GameContext.Provider>
  );
};