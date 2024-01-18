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

            const HARD_MODE_ORDER = "PBGY";

            getDateAttributes(payload).forEach((b) => {
                const board_order = b.board
                    .split("\n")
                    .map((str) => str[0])
                    .join("");

                const completed_hard_mode = board_order === HARD_MODE_ORDER;
                b.is_hardmode = completed_hard_mode;

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
