import { GameActionTypes } from "../action-types";

interface StartAction {
    type: GameActionTypes.START
}

interface EndAction {
    type: GameActionTypes.END
}

export type GameAction = StartAction | EndAction;