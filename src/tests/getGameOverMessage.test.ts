import { expect, describe, it } from "vitest"
import { INITIAL_PLAYERS } from "../utils/consts"
import { getGameOverMessage } from "../logic/game-logic"

describe('getGameOverMessage', () => {
    it('победа первого игрока', () => {
        const result = getGameOverMessage(INITIAL_PLAYERS[0], false)

        expect(result).toEqual(`Победил ${INITIAL_PLAYERS[0].name}. Поздравляем!`)
    })

    it('победа второго игрока', () => {
        const result = getGameOverMessage(INITIAL_PLAYERS[1], false)

        expect(result).toEqual(`Победил ${INITIAL_PLAYERS[1].name}. Поздравляем!`)
    })

    it('ничья', () => {
        const result = getGameOverMessage(null, true)

        expect(result).toEqual(`Ничья`)
    })

    it('если не победа и не ничья то сообщение об ошибке', () => {
        const result = getGameOverMessage(null, false)

        expect(result).toEqual('Что-то пошло не так(')
    })
})
