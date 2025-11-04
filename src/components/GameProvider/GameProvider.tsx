import { FC, JSX, PropsWithChildren } from "react";
import { GameContext } from "../../hooks/useGame";
import { useGameLogic } from "../../hooks/useGameLogic";

export const GameProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const gameLogic = useGameLogic();

  return (
    <GameContext.Provider value={gameLogic}>
      {children}
    </GameContext.Provider>
  );
};