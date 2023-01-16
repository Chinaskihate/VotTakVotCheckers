import { ModeActionTypes } from "../action-types";
import { ModeAction } from "../actions/ModeAction";

const initialState = false;

export const modeReducer = (state: boolean = initialState, action: ModeAction) => {
    switch (action.type) {
        case ModeActionTypes.START_ONLINE:
            return true;
        case ModeActionTypes.START_OFFLINE:
            return false;
        default:
            return state;
    }
}