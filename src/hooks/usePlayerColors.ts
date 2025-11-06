import { useMemo } from 'react';
import { initialPlayers } from '../consts.ts';

/**
 * Кастомный хук для получения цветов игроков из начальных настроек
 * 
 * @returns {string[]} Массив цветов игроков в формате строк
 */
export const usePlayerColors = () => {
  return useMemo(() => initialPlayers.map(player => player.color), []);
}
