import { UsernameActionTypes } from "../action-types";

interface SetAction {
    type: UsernameActionTypes.SET
}

interface ClearAction {
    type: UsernameActionTypes.CLEAR
}

export type UsernameAction = SetAction | ClearAction;