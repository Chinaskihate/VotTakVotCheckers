import { GameActionTypes } from "../action-types";
import { GameAction } from "../actions/GameAction";
import { GameStatus } from "../models/GameStatus";

const initialState = new GameStatus(false, null);

export const gameReducer = (state: GameStatus = initialState, action: GameAction) => {
    switch (action.type) {
        case GameActionTypes.START:
            return new GameStatus(true, action.payload);
        case GameActionTypes.END:
            return new GameStatus(false, null);
        default:
            return state;
    }
}