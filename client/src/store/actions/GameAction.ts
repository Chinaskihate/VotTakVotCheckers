import { Color } from "../../contract/models/figures/checker";
import { GameActionTypes } from "../action-types";

interface StartAction {
    type: GameActionTypes.START,
    payload: Color
}

interface EndAction {
    type: GameActionTypes.END
}

export type GameAction = StartAction | EndAction;