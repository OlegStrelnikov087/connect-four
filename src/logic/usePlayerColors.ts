import { ChipColors } from '../utils/enums';
import { useGame } from './useGame';

/**
 * Хук для работы с цветами игроков
 */
export const usePlayerColors = () => {
  const { players, updatePlayerSettings } = useGame();

  const updatePlayerColors = (player1Color: ChipColors, player2Color: ChipColors) => {
    const updatedPlayers = [
        { ...players[0], color: player1Color },
        { ...players[1], color: player2Color }
    ];
    updatePlayerSettings(updatedPlayers);
  };

  const updatePlayerNames = (player1Name: string, player2Name: string) => {
    const updatedPlayers = [
        { ...players[0], name: player1Name },
        { ...players[1], name: player2Name }
    ];
    updatePlayerSettings(updatedPlayers);
  };

  const updateAllSettings = (player1Name: string, player1Color: ChipColors, player2Name: string, player2Color: ChipColors) => {
    const updatedPlayers = [
        { ...players[0], name: player1Name, color: player1Color },
        { ...players[1], name: player2Name, color: player2Color }
    ];
    updatePlayerSettings(updatedPlayers);
  };

  return {
    player1: players[0],
    player2: players[1],
    updatePlayerColors,
    updatePlayerNames,
    updateAllSettings
  };
}