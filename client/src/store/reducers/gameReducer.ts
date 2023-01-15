import { GameActionTypes } from "../action-types";
import { GameAction } from "../actions/GameAction";

const initialState = false;

export const gameReducer = (state: boolean = initialState, action: GameAction) => {
    switch (action.type) {
        case GameActionTypes.START:
            return true;
        case GameActionTypes.END:
            return false;
        default:
            return state;
    }
}