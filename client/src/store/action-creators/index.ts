import { Dispatch } from "redux";
import {Checker, Color } from "../../contract/models/figures/checker";
import { Board } from "../../contract/models/game_components/board";
import { GameActionTypes, ModeActionTypes, UsernameActionTypes } from "../action-types";
import { GameAction } from "../actions/GameAction";
import { ModeAction } from "../actions/ModeAction";
import { UsernameAction } from "../actions/UsernameAction";

export const startGame = (playerColor: Color, position: (Checker | null)[][], currentMove: Color) => {
    return (dispatch: Dispatch<GameAction>) => {
        dispatch({
            type: GameActionTypes.START,
            payload: {
                playerColor: playerColor,
                position: position,
                currentMove: currentMove
            }
        })
    }
}

export const moveGame = (playerColor: Color, position: (Checker | null)[][], currentMove: Color) => {
    return (dispatch: Dispatch<GameAction>) => {
        dispatch({
            type: GameActionTypes.MOVE,
            payload: {
                playerColor: playerColor,
                position: position,
                currentMove: currentMove
            }
        })
    }
}

export const endGame = () => {
    return (dispatch: Dispatch<GameAction>) => {
        dispatch({
            type: GameActionTypes.END
        })
    }
}

export const setUsername = (username: string) => {
    return (dispatch: Dispatch<UsernameAction>) => {
        dispatch({
            type: UsernameActionTypes.SET,
            payload: username
        })
    }
}

export const clearUsername = () => {
    return (dispatch: Dispatch<UsernameAction>) => {
        dispatch({
            type: UsernameActionTypes.CLEAR
        })
    }
}

export const startOnline = () => {
    return (dispatch: Dispatch<ModeAction>) => {
        dispatch({
            type: ModeActionTypes.START_ONLINE
        })
    }
}

export const startOffline = () => {
    return (dispatch: Dispatch<ModeAction>) => {
        dispatch({
            type: ModeActionTypes.START_OFFLINE
        })
    }
}