import { BankActionTypes } from "../action-types";
import { BankAction } from "../actions/BankActions";

const initialState = 0;

export const bankReducer = (state: number = initialState, action: BankAction) => {
    switch (action.type) {
        case BankActionTypes.DEPOSIT:
            return state + Number(action.payload);
        case BankActionTypes.WITHDRAW:
            return state - Number(action.payload);
        case BankActionTypes.BANKRUPT:
            return 0;
        default:
            return state;
    }
}