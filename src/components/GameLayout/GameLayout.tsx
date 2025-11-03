import { FC, PropsWithChildren, ReactElement } from "react";
import { GameMenu } from "../GameMenu/GameMenu";
import { GameStatusInfo } from "../GameStatusInfo/GameStatusInfo";
import { GameAlert } from "../Modal/GameAlert";

export const GameLayout: FC<PropsWithChildren> = ({ children }): ReactElement => {

    return (
        <div className="gameBlock">
            <h1>Приветствуем в игре "Четыре в ряд"</h1>
            <GameMenu />
            <div className="gameContainer">
                <GameStatusInfo />
                {children}
            </div>
            <GameAlert />
        </div>
    );
};