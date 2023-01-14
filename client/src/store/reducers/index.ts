import { combineReducers } from "redux";
import { bankReducer } from "./bankReducer";

export const rootReducer = combineReducers({
   bank: bankReducer
});

export type RootState = ReturnType<typeof rootReducer>