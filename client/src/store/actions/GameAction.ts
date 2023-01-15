import { Color } from "../../contract/models/figures/checker";
import { Board } from "../../contract/models/game_components/board";
import { GameActionTypes } from "../action-types";

interface StartAction {
    type: GameActionTypes.START,
    payload: {
        playerColor: Color,
        currentMove: Color,
        board: Board
    }
}

interface EndAction {
    type: GameActionTypes.END
}

export type GameAction = StartAction | EndAction;