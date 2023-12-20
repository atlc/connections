import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "./boards/boardsSlice";
import leaderboardReducer from "./leaderboard/leaderboardSlice";
import inputsReducer from "./inputs/inputsSlice";

export const store = configureStore({
    reducer: {
        boards: boardsReducer,
        leaderboard: leaderboardReducer,
        inputs: inputsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
