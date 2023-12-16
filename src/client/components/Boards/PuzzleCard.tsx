import React from "react";
import { BoardCardProps } from "../../types";
import { unsanitize } from "../../utilities/parsers";

/**
 *
 * @returns A card consisting of an individual user's submission for the day
 */
const PuzzleCard = (props: BoardCardProps) => {
    const { name, id, is_perfect, board, number, timestamp, is_gunslinger } = props.board;
    const first_timestamp_day = 172;
    const is_timestamped = parseInt(number) && parseInt(number) > first_timestamp_day;

    return (
        <>
            <div key={`${name}-puzzle-card-${id}`} className="my-1 col-6 col-md-4 col-lg-3">
                <div className={`card p-1 shadow-lg ${is_perfect ? "bg-success-subtle" : ""}`}>
                    <h3 className={`text-center ${is_perfect ? "text-success" : "text-muted"}`}>
                        {name}
                        <span className="emoji">{is_perfect ? "🌠" : ""}</span>
                        <span className="emoji">{is_gunslinger ? "⏱️" : ""}</span>
                    </h3>
                    {is_timestamped && <span className="text-muted text-end time">{timestamp}</span>}

                    <textarea
                        value={unsanitize(board)}
                        style={{ resize: "none" }}
                        className="form-control text-center"
                        rows={7}
                        readOnly
                    />
                </div>
            </div>
        </>
    );
};

export default PuzzleCard;
