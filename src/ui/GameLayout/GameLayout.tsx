import { FC, PropsWithChildren, ReactElement } from "react";
import { GameMenu } from "../GameMenu/GameMenu";
import { GameStatusInfo } from "../GameStatusInfo/GameStatusInfo";
import { GameAlert } from "../Modal/GameAlert";
import './GameLayout.css'

/**
 * Layout компонент для организации игрового интерфейса
 * 
 * @component
 * @param {PropsWithChildren} props - Свойства компонента
 * @param {ReactNode} props.children - Дочерние компоненты (в моем случае игровое поле)
 * @returns {ReactElement} Полный layout игрового интерфейса
 */
export const GameLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {

    return (
        <div className="gameBlock">
            <h1 className="helloMessage">Приветствуем в игре "Четыре в ряд"</h1>
            <GameMenu />
            <div className="gameContainer">
                <GameStatusInfo />
                {children}
            </div>
            <GameAlert />
        </div>
    );
};