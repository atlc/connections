import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IComment, CommentsByDate } from "../../types";

const initialState: { comments: CommentsByDate } = {
    comments: {},
};

export const boardsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        sort_and_set_comments: (state, { payload }: PayloadAction<IComment[]>) => {
            const commentsByDate: CommentsByDate = {};
            payload.forEach((comment) => {
                if (!commentsByDate[comment.day]) {
                    commentsByDate[comment.day] = [{ ...comment }];
                } else {
                    commentsByDate[comment.day].push({ ...comment });
                }
            });

            state.comments = commentsByDate;
        },
    },
});

export const { sort_and_set_comments } = boardsSlice.actions;

export default boardsSlice.reducer;
