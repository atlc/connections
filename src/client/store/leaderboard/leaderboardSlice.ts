import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FullLeaderboard } from "../../types";

const initialState: { leaderboard: FullLeaderboard } = {
    leaderboard: {},
};

export const leaderboardSlice = createSlice({
    name: "leaderboard",
    initialState,
    reducers: {
        set_leaderboard: (state, action: PayloadAction<FullLeaderboard>) => {
            state.leaderboard = action.payload;
        },
    },
});

export const { set_leaderboard } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;
