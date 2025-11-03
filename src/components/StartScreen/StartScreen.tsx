import React from "react";
interface StartScreenProps {
    startGameHandler: () => void
}
export const StartScreen: React.FC<StartScreenProps> = ({ startGameHandler }) => {
    return (
        <div className="waitingGameBlock">
            <h1>Приветсвуем в игре "Четыре в ряд"</h1>
            <button onClick={startGameHandler} className='btn'>Начать игру</button>
        </div>
    )

}