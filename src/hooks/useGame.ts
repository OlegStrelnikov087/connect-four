import { createContext, useContext } from 'react';
import { GameLogicResult } from '../types';

export const GameContext = createContext<GameLogicResult | null>(null);

export const useGame = (): GameLogicResult => {
  const context = useContext(GameContext);
  if (context === null) {
    throw new Error('useGame должен использоваться с GameProvider');
  }
  return context;
};
