import { FC, JSX, useState, useEffect } from 'react';
import { useGame } from '../../logic/useGame.ts';
import { ChipColors } from '../../utils/enums';
import './SetupGame.css';
import { COLORS } from '../../utils/consts.ts';

export const SetupGame: FC = (): JSX.Element => {
    const { players, updatePlayerSettings } = useGame();

    const [player1Name, setPlayer1Name] = useState<string>(players[0]?.name || 'Игрок 1');
    const [player2Name, setPlayer2Name] = useState<string>(players[1]?.name || 'Игрок 2');
    const [player1Color, setPlayer1Color] = useState<ChipColors>(players[0]?.color || ChipColors.Red);
    const [player2Color, setPlayer2Color] = useState<ChipColors>(players[1]?.color || ChipColors.Yellow);

    useEffect(() => {
        if (players[0]) {
            setPlayer1Name(players[0].name);
            setPlayer1Color(players[0].color);
        }
        if (players[1]) {
            setPlayer2Name(players[1].name);
            setPlayer2Color(players[1].color);
        }
    }, [players]);

    const handleSaveSetup = () => {
        const updatedPlayers = [
            { ...players[0], name: player1Name, color: player1Color },
            { ...players[1], name: player2Name, color: player2Color }
        ];
        updatePlayerSettings(updatedPlayers);

        alert('Настройки сохранены!');
    };

    // Функции для преобразования ChipColors в hex
    const chipColorToHex = (color: ChipColors): string => {
        switch (color) {
            case ChipColors.Red: return '#ff4444';
            case ChipColors.Yellow: return '#ffff44';
            case ChipColors.Black: return '#000000'
            case ChipColors.Blue: return '#4444ff'
            case ChipColors.Green: return '#44ff44'
            default: return '#ff4444';
        }
    };

    return (
        <div className="setup-game">
            <div className="setup-game__header">
                <h1 className="setup-game__title">Connect Four</h1>
                <p className="setup-game__subtitle">Настройте игру</p>
            </div>

            <div className="setup-game__content">
                <div className="player-settings">
                    <div className="player-setting">
                        <h3>Игрок 1</h3>
                        <div className="input-group">
                            <label htmlFor="player1-name">Имя:</label>
                            <input
                                id="player1-name"
                                type="text"
                                value={player1Name}
                                onChange={(e) => setPlayer1Name(e.target.value)}
                                placeholder="Введите имя игрока 1"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="player1-color">Цвет:</label>
                            <select
                                id="player1-color"
                                value={player1Color}
                                onChange={(e) => setPlayer1Color(e.target.value as ChipColors)}
                            >
                                {COLORS.map((color, i) => (
                                    <option key={i} value={color.value}>{color.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="player-setting">
                        <h3>Игрок 2</h3>
                        <div className="input-group">
                            <label htmlFor="player2-name">Имя:</label>
                            <input
                                id="player2-name"
                                type="text"
                                value={player2Name}
                                onChange={(e) => setPlayer2Name(e.target.value)}
                                placeholder="Введите имя игрока 2"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="player2-color">Цвет:</label>
                            <select
                                id="player2-color"
                                value={player2Color}
                                onChange={(e) => setPlayer2Color(e.target.value as ChipColors)}
                            >
                                {COLORS.map((color, i) => (
                                    <option key={i} value={color.value}>{color.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="preview">
                    <h3>Предпросмотр</h3>
                    <div className="preview-tokens">
                        <div
                            className="preview-token"
                            style={{
                                backgroundColor: chipColorToHex(player1Color),
                            }}
                        >
                            {player1Name}
                        </div>
                        <div
                            className="preview-token"
                            style={{
                                backgroundColor: chipColorToHex(player2Color),
                            }}
                        >
                            {player2Name}
                        </div>
                    </div>
                </div>
            </div>

            <div className="setup-game__actions">
                <button
                    className="save-button"
                    onClick={handleSaveSetup}
                >
                    Сохранить настройки
                </button>
            </div>
        </div>
    );
};
