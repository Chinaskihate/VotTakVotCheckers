import { UsernameActionTypes } from "../action-types";

interface SetAction {
    type: UsernameActionTypes.SET,
    payload?: string;
}

interface ClearAction {
    type: UsernameActionTypes.CLEAR
}

export type UsernameAction = SetAction | ClearAction;