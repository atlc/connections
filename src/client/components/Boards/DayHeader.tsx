import React from "react";
import { DayHeaderProps, IBoard } from "../../types";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

/**
 *
 * @returns A header announcing which puzzle day it is.
 * @returns If all submissions fail, appends "Embarrassing!"
 * @returns If all submissions get a perfect score, appends "Team ACE!"
 */
const DayHeader = ({ day }: DayHeaderProps) => {
    const boards = useSelector((state: RootState) => state.boards.boards);

    const is_perfect = (board: IBoard) => board.is_perfect;
    const is_failure = (board: IBoard) => !board.is_win;

    const many_have_played = boards[day].length > 1;
    const all_are_perfect = boards[day].every(is_perfect);
    const all_are_failures = boards[day].every(is_failure);

    const perfections = boards[day].filter((b) => b.is_perfect);
    const players = boards[day];
    const one_person_screwed_up = players.length - 1 === perfections.length;
    const whos_to_blame = players.find((b) => !b.is_perfect)?.name || "<<Andrew sucks at coding, could not find name>>";

    return (
        <h1 className="text-center">
            Puzzle #{day}{" "}
            {many_have_played &&
                (all_are_perfect ? (
                    <em className="text-success">(Team ACE!)</em>
                ) : all_are_failures ? (
                    <em className="text-danger">(Embarrassing!)</em>
                ) : one_person_screwed_up ? (
                    <p style={{ fontSize: "1rem" }} className="text-muted">
                        WOMP WOMP - we were <em>almost</em> all perfect. Thanks, {whos_to_blame}!
                    </p>
                ) : (
                    ""
                ))}
        </h1>
    );
};

export default DayHeader;
