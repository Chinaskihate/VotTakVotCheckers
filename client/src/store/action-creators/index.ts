import { Dispatch } from "redux";
import {Checker, Color } from "../../contract/models/figures/checker";
import { Board } from "../../contract/models/game_components/board";
import { BankActionTypes, GameActionTypes, UsernameActionTypes } from "../action-types";
import { BankAction } from "../actions/BankActions";
import { GameAction } from "../actions/GameAction";
import { UsernameAction } from "../actions/UsernameAction";

export const depositMoney = (amount: number) => {
    return (dispatch: Dispatch<BankAction>) => {
        dispatch({
            type: BankActionTypes.DEPOSIT,
            payload: amount
        })
    }
}


export const withdrawMoney = (amount: number) => {
    return (dispatch: Dispatch<BankAction>) => {
        dispatch({
            type: BankActionTypes.WITHDRAW,
            payload: amount
        })
    }
}

export const bankrupt = () => {
    return (dispatch: Dispatch<BankAction>) => {
        dispatch({
            type: BankActionTypes.BANKRUPT
        })
    }
}

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