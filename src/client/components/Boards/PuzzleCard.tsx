import React from "react";
import { BoardCardProps } from "../../types";
import { unsanitize } from "../../utilities/parsers";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

/**
 *
 * @returns A card consisting of an individual user's submission for the day
 */
const PuzzleCard = (props: BoardCardProps) => {
    const { name, id, is_perfect, board, number, timestamp, is_gunslinger, is_hardmode } = props.board;
    const first_timestamp_day = 172;
    const is_timestamped = parseInt(number) && parseInt(number) > first_timestamp_day;
    const isDark = useSelector((state: RootState) => state.inputs.darkMode);

    const DARK = isDark;
    const LIGHT = !isDark;
    const PERFECT = is_perfect;
    const NOT_PERFECT = !is_perfect;

    return (
        <>
            <div key={`${name}-puzzle-card-${id}`} className="my-1 col-6 col-md-4 col-lg-3">
                <div
                    className={`card p-1 shadow-lg border 
                      ${DARK && PERFECT && "bg-dark border-success"}
                      ${DARK && NOT_PERFECT && "bg-dark border-secondary"}
                      ${LIGHT && PERFECT && "bg-success-subtle text-success"}
                      ${LIGHT && NOT_PERFECT && "bg-light border-light"}
                    `}
                >
                    <h3
                        className={`text-center 
                          ${DARK && PERFECT && "text-success"}
                          ${DARK && NOT_PERFECT && "text-secondary"}
                          ${LIGHT && PERFECT && "text-success"}
                          ${LIGHT && NOT_PERFECT && "text-muted"}
                        `}
                    >
                        {name}
                        <span className="emoji">{is_perfect ? "🌠" : ""}</span>
                        <span className="emoji">{is_gunslinger ? "⏱️" : ""}</span>
                        <span className="emoji bg-success rounded-1 ">{is_hardmode ? "💪" : ""}</span>
                    </h3>
                    {is_timestamped && (
                        <span
                            className={`text-end ${
                                is_perfect ? "text-success" : isDark ? "text-secondary" : "text-dark"
                            } time`}
                        >
                            {timestamp}
                        </span>
                    )}

                    <textarea
                        value={unsanitize(board)}
                        style={{ resize: "none" }}
                        className={`form-control text-center ${
                            isDark ? "bg-dark border border-top border-secondary" : "bg-light"
                        }`}
                        rows={7}
                        readOnly
                    />
                </div>
            </div>
        </>
    );
};

export default PuzzleCard;
