import { GameActionTypes } from "../action-types";
import { GameAction } from "../actions/GameAction";
import { GameStarts } from "../models/GameStarts";

const initialState = new GameStarts(false, null);

export const gameReducer = (state: GameStarts = initialState, action: GameAction) => {
    switch (action.type) {
        case GameActionTypes.START:
            console.log(action.payload)
            return new GameStarts(true, action.payload);
        case GameActionTypes.END:
            return new GameStarts(false, null);
        default:
            return state;
    }
}