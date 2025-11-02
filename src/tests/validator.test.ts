import { describe, it, expect } from "vitest";
import { validator } from "../validator";

describe('validator', () => {
    it('pass [0,1,2,3,4,5,6] to the function', () => {
        const result = validator([0, 1, 2, 3, 4, 5, 6])

        expect(result).toEqual({
            step_0: {
                player_1: [],
                player_2: [],
                board_state: 'waiting'
            },
            step_1: {
                player_1: [[5, 0]],
                player_2: [],
                board_state: 'pending'
            },
            step_2: {
                player_1: [[5, 0]],
                player_2: [[5, 1]],
                board_state: 'pending'
            },
            step_3: {
                player_1: [[5, 0], [5, 2]],
                player_2: [[5, 1]],
                board_state: 'pending'
            },
            step_4: {
                player_1: [[5, 0], [5, 2]],
                player_2: [[5, 1], [5, 3]],
                board_state: 'pending'
            },
            step_5: {
                player_1: [[5, 0], [5, 2], [5, 4]],
                player_2: [[5, 1], [5, 3]],
                board_state: 'pending'
            },
            step_6: {
                player_1: [[5, 0], [5, 2], [5, 4]],
                player_2: [[5, 1], [5, 3], [5, 5]],
                board_state: 'pending'
            },
            step_7: {
                player_1: [[5, 0], [5, 2], [5, 4], [5, 6]],
                player_2: [[5, 1], [5, 3], [5, 5]],
                board_state: 'pending'
            },
        })
    })

    it('pass [0,1,0,1,0,1,0] to the function', () => {
        const result = validator([0, 1, 0, 1, 0, 1, 0])

        expect(result).toEqual({
            step_0: {
                player_1: [],
                player_2: [],
                board_state: 'waiting'
            },
            step_1: {
                player_1: [[5, 0]],
                player_2: [],
                board_state: 'pending'
            },
            step_2: {
                player_1: [[5, 0]],
                player_2: [[5, 1]],
                board_state: 'pending'
            },
            step_3: {
                player_1: [[5, 0], [4, 0]],
                player_2: [[5, 1]],
                board_state: 'pending'
            },
            step_4: {
                player_1: [[5, 0], [4, 0]],
                player_2: [[5, 1], [4, 1]],
                board_state: 'pending'
            },
            step_5: {
                player_1: [[5, 0], [4, 0], [3, 0]],
                player_2: [[5, 1], [4, 1]],
                board_state: 'pending'
            },
            step_6: {
                player_1: [[5, 0], [4, 0], [3, 0]],
                player_2: [[5, 1], [4, 1], [3, 1]],
                board_state: 'pending'
            },
            step_7: {
                player_1: [[5, 0], [4, 0], [3, 0], [2, 0]],
                player_2: [[5, 1], [4, 1], [3, 1]],
                board_state: 'win',
                winner: {
                    who: 'player_1',
                    positions: [[5, 0], [4, 0], [3, 0], [2, 0]]
                }
            }

        })
    })
})