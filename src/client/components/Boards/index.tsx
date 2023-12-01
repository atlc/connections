import React from "react";
import type { DateSortedBoards } from "../../App";
import { unsanitize } from "../../utilities/parsers";

interface BoardsProps {
    boards: DateSortedBoards;
}

const Boards = ({ boards }: BoardsProps) => {
    return (
        <>
            {Object.keys(boards)
                .reverse()
                .map((key) => (
                    <div
                        key={`puzzle-row-${key}`}
                        className="my-5 rounded-3 p-2 bg-light-subtle row justify-content-center"
                    >
                        <h1 className="text-center">
                            Puzzle #{key}{" "}
                            {boards[key].every((b) => b.is_perfect) ? (
                                <span className="text-success">(Team ACE!)</span>
                            ) : boards[key].every(
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
                        {boards[key].map((b) => (
                            <div key={`${b.name}-puzzle-card-${b.id}`} className="my-1 col-6 col-md-4 col-lg-3">
                                <div className={`card p-1 shadow-lg ${b.is_perfect ? "bg-success-subtle" : ""}`}>
                                    <h1 className={`text-center ${b.is_perfect ? "text-success" : "text-muted"}`}>
                                        {b.name} {b.is_perfect ? "🌟" : ""}
                                    </h1>
                                    <textarea
                                        style={{ resize: "none" }}
                                        className="form-control text-center"
                                        rows={7}
                                        readOnly
                                    >
                                        {unsanitize(b.board)}
                                    </textarea>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
        </>
    );
};

export default Boards;
