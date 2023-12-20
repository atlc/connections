import React from "react";
import DayCard from "./DaySet";
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
                    <DayCard day={day} key={`puzzle-row-${day}`} />
                ))}
        </>
    );
};

export default Boards;
