import { useMemo } from 'react';
import { initialPlayers } from '../consts.ts';

/**
 * Пока по сути это не хук. Но когда мы переедем на видоизменяемые цвета и типы фишек, задаваемые
 * из интерфейса, то возможно тут мы будем работать с каким-то внешним стейтом/хуком/контекстом/стором
 */
export const usePlayerColors = () => {
  return useMemo(() => initialPlayers.map(player => player.color), []);
}
