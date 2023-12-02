import React from "react";
import { DayHeaderProps } from "../../types";

/**
 *
 * @returns A header announcing which puzzle day it is.
 * @returns If all submissions fail, appends "Embarrassing!"
 * @returns If all submissions get a perfect score, appends "Team ACE!"
 */
const DayHeader = ({ boards, day }: DayHeaderProps) => {
    return (
        <h1 className="text-center">
            Puzzle #{day}{" "}
            {boards[day].every((b) => b.is_perfect) ? (
                <em className="text-success">(Team ACE!)</em>
            ) : boards[day].every((b) => !b.is_win) ? (
                <em className="text-danger">(Embarrassing!)</em>
            ) : (
                ""
            )}
        </h1>
    );
};

export default DayHeader;
