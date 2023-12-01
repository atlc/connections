import React from "react";
import type { BoardsProps } from "../../types";
import DayCard from "./DayCard";

/**
 *
 * @returns In reverse chronological order, all boards and submissions for all days
 */
const Boards = ({ boards }: BoardsProps) => {
    return (
        <>
            {Object.keys(boards)
                .reverse()
                .map((day) => (
                    <DayCard {...{ day, boards }} key={`puzzle-row-${day}`} />
                ))}
        </>
    );
};

export default Boards;
