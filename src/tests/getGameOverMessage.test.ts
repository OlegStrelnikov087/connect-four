import { expect, describe, it } from "vitest"
import { initialPlayers } from "../consts"
import { getGameOverMessage } from "../game-logic"

describe('getGameOverMessage', () => {
    it('победа первого игрока', () => {
        const result = getGameOverMessage(initialPlayers[0], false)

        expect(result).toEqual(`Победил ${initialPlayers[0].name}. Поздравляем!`)
    })

    it('победа второго игрока', () => {
        const result = getGameOverMessage(initialPlayers[1], false)

        expect(result).toEqual(`Победил ${initialPlayers[1].name}. Поздравляем!`)
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
