import {Checker, Color } from "../../contract/models/figures/checker";
import { Board } from "../../contract/models/game_components/board";
import { GameActionTypes } from "../action-types";

interface StartAction {
    type: GameActionTypes.START,
    payload: {
        playerColor: Color,
        currentMove: Color,
        position: (Checker | null)[][]
    }
}

interface MoveAction {
    type: GameActionTypes.MOVE,
    payload: {
        playerColor: Color,
        currentMove: Color,
        position: (Checker | null)[][]
    }
}

interface EndAction {
    type: GameActionTypes.END
}

export type GameAction = StartAction | EndAction | MoveAction;