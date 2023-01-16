import { GameActionTypes } from "../action-types";
import { GameAction } from "../actions/GameAction";
import { GameStatus } from "../models/GameStatus";

const initialState = new GameStatus(false, null, null, null);

export const gameReducer = (state: GameStatus = initialState, action: GameAction) => {
    switch (action.type) {
        case GameActionTypes.START:
            console.log(action.payload)
            return new GameStatus(true, action.payload.playerColor, action.payload.position, action.payload.currentMove);
        case GameActionTypes.MOVE:
            console.log(action.payload)
            return new GameStatus(true, action.payload.playerColor, action.payload.position, action.payload.currentMove);
        case GameActionTypes.END:
            return new GameStatus(false, null, null, null);
        default:
            return state;
    }
}