import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    hadName: false,
    changeName: false,
    showAddBoard: true,
    board: "",
};

export const inputsSlice = createSlice({
    name: "inputs",
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setHadName: (state, action: PayloadAction<boolean>) => {
            state.hadName = action.payload;
        },
        setShouldChangeName: (state, action: PayloadAction<boolean>) => {
            state.changeName = action.payload;
        },
        setShowAddBoard: (state, action: PayloadAction<boolean>) => {
            state.showAddBoard = action.payload;
        },
        setBoard: (state, action: PayloadAction<string>) => {
            state.board = action.payload;
        },
    },
});

export const { setBoard, setName, setHadName, setShouldChangeName, setShowAddBoard } = inputsSlice.actions;

export default inputsSlice.reducer;
