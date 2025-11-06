import { FC, JSX, PropsWithChildren } from "react";
import { GameContext } from "../../logic/useGame";
import { useGameLogic } from "../../logic/useGameLogic";

/**
 * Провайдер контекста для управления состоянием игры
 * 
 * @component
 * @param {PropsWithChildren} props - Свойства компонента
 * @param {ReactNode} props.children - Дочерние компоненты, которые будут иметь доступ к контексту игры
 * @returns {JSX.Element} Провайдер контекста с игровой логикой
 */
export const GameProvider: FC<PropsWithChildren> = ({ children }): JSX.Element => {
  const gameLogic = useGameLogic();

  return (
    <GameContext.Provider value={gameLogic}>
      {children}
    </GameContext.Provider>
  );
};