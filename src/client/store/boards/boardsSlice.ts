import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IBoard } from "../../types";
import { getDateAttributes } from "../../utilities/parsers";

export interface ByDate {
    [board_number: string]: IBoard[];
}

const initialState: { boards: ByDate } = {
    boards: {},
};

export const boardsSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {
        set_from_api: (state, { payload }: PayloadAction<IBoard[]>) => {
            const byDate: { [key: string]: IBoard[] } = {};

            getDateAttributes(payload).forEach((b) => {
                if (!byDate[b.number]) {
                    byDate[b.number] = [b];
                } else {
                    byDate[b.number].push(b);
                }
            });
            state.boards = byDate;
        },
    },
});

export const { set_from_api } = boardsSlice.actions;

export default boardsSlice.reducer;
