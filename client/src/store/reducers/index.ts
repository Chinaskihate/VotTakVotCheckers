import { combineReducers } from "redux";
import { gameReducer } from "./gameReducer";
import { modeReducer } from "./modeReducer";
import { usernameReducer } from "./usernameReducer";

export const rootReducer = combineReducers({
   game: gameReducer,
   username: usernameReducer,
   mode: modeReducer
});

export type RootState = ReturnType<typeof rootReducer>