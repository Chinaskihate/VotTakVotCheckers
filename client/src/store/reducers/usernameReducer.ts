import { UsernameActionTypes } from "../action-types";
import { UsernameAction } from "../actions/UsernameAction";

const initialState = '';

export const usernameReducer = (state: string = initialState, action: UsernameAction) => {
    switch (action.type) {
        case UsernameActionTypes.SET:
            return state;
        case UsernameActionTypes.CLEAR:
            return '';
        default:
            return state;
    }
}