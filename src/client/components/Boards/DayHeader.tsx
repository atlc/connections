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
                <span className="text-success">(Team ACE!)</span>
            ) : boards[day].every(
                  (b) =>
                      b.board
                          .split("\n")
                          .map((row) => row.trim())
                          .filter((row) => [...row].every((char) => char === row[0])).length !== 4
              ) ? (
                <span className="text-danger">
                    <em>(Embarrassing!)</em>
                </span>
            ) : (
                ""
            )}
        </h1>
    );
};

export default DayHeader;
