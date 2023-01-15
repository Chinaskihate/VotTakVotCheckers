import { combineReducers } from "redux";
import { bankReducer } from "./bankReducer";
import { gameReducer } from "./gameReducer";
import { usernameReducer } from "./usernameReducer";

export const rootReducer = combineReducers({
   bank: bankReducer,
   game: gameReducer,
   username: usernameReducer
});

export type RootState = ReturnType<typeof rootReducer>