import React from "react";
import DaySet from "./DaySet";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

/**
 *
 * @returns In reverse chronological order, all boards and submissions for all days
 */
const Boards = () => {
    const boards = useSelector((state: RootState) => state.boards.boards);

    return (
        <>
            {Object.keys(boards)
                .reverse()
                .map((day) => (
                    <DaySet day={day} key={`puzzle-row-${day}`} />
                ))}
        </>
    );
};

export default Boards;
