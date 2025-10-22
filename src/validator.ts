import { getMoveData } from "./game-logic";
import { BoardValue } from "./types";
interface StepResult {
    player_1: [number, number][];
    player_2: [number, number][];
    board_state: 'waiting' | 'pending' | 'win' | 'draw';
    winner?: {
        who: 'player_1' | 'player_2';
        positions: [number, number][];
    };
}
interface ValidatorResult {
    [key: string]: StepResult
}

export const validator = (steps: number[]): ValidatorResult => {
    const ROWS = 6;
    const COLS = 7;
    const board: BoardValue = Array.from({ length: COLS }, () => Array(ROWS).fill(0));

    const result: ValidatorResult = {
        step_0: {
            player_1: [],
            player_2: [],
            board_state: 'waiting'
        },
    };

    let gameOver = false;

    for (let stepId = 0; stepId < steps.length && !gameOver; stepId++) {
        const columnId = steps[stepId];
        const playerNumber = (stepId % 2) + 1;

        let rowId = -1;
        for (let row = ROWS - 1; row >= 0; row--) {
            if (board[columnId][row] === 0) {
                board[columnId][row] = playerNumber;
                rowId = row;
                break;
            }
        }

        if (rowId === -1) continue;

        const player1Positions: [number, number][] = [];
        const player2Positions: [number, number][] = [];

        for (let col = 0; col < COLS; col++) {
            for (let row = 0; row < ROWS; row++) {
                if (board[col][row] === 1) {
                    player1Positions.push([row, col]);
                } else if (board[col][row] === 2) {
                    player2Positions.push([row, col]);
                }
            }
        }

        const moveData = getMoveData(board, columnId, rowId, ROWS, COLS);
        const isBoardFull = board.every(col => col.every(cell => cell !== 0));

        let board_state: 'pending' | 'win' | 'draw' = 'pending';
        let winner: { who: 'player_1' | 'player_2'; positions: [number, number][] } | undefined = undefined;

        if (moveData.isWinMove) {
            board_state = 'win';
            winner = {
                who: playerNumber === 1 ? 'player_1' : 'player_2',
                positions: moveData.position
            };
            gameOver = true;
        } else if (isBoardFull) {
            board_state = 'draw';
            gameOver = true;
        }


        const stepResult: StepResult = {
            player_1: player1Positions,
            player_2: player2Positions,
            board_state,
        };

        if (winner) {
            stepResult.winner = winner;
        }

        result[`step_${stepId + 1}`] = stepResult;
    }

    if (!gameOver && steps.length > 0) {
        const lastStep = steps.length;
        if (!result[`step_${lastStep}`]) {
            const player1Positions: [number, number][] = [];
            const player2Positions: [number, number][] = [];

            for (let col = 0; col < COLS; col++) {
                for (let row = 0; row < ROWS; row++) {
                    if (board[col][row] === 1) {
                        player1Positions.push([row, col]);
                    } else if (board[col][row] === 2) {
                        player2Positions.push([row, col]);
                    }
                }
            }

            result[`step_${lastStep}`] = {
                player_1: player1Positions,
                player_2: player2Positions,
                board_state: 'pending'
            };
        }
    }

    return result;
};