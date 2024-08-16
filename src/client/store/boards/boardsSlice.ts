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

            getDateAttributes(payload).forEach((b, i) => {
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

            const COUNT = byDate[Object.keys(byDate)[0]].length;

            Object.keys(byDate).forEach((date) => {
                const day = byDate[date];
                const perfections = day.filter((b) => b.is_perfect);
                const has_champion = perfections.length === 1;

                if (has_champion) {
                    const champ = perfections[0].name;
                    day[day.findIndex((b) => b.name === champ)].is_the_champion = true;
                }
            });

            state.boards = byDate;
        },
    },
});

export const { set_from_api } = boardsSlice.actions;

export default boardsSlice.reducer;
