import { Dispatch } from "redux";
import { BankActionTypes } from "../action-types";
import { BankAction } from "../actions/BankActions";

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