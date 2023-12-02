import React from "react";
import { BoardCardProps } from "../../types";
import { unsanitize } from "../../utilities/parsers";

/**
 *
 * @returns A card consisting of an individual user's submission for the day
 */
const PuzzleCard = (props: BoardCardProps) => {
    const { name, id, is_perfect, board, number, timestamp, time_delta, is_gunslinger } = props.board;
    const first_timestamp_day = 172;
    const is_timestamped = parseInt(number) && parseInt(number) > first_timestamp_day;

    return (
        <>
            <div key={`${name}-puzzle-card-${id}`} className="my-1 col-6 col-md-4 col-lg-3">
                <div className={`card p-1 shadow-lg ${is_perfect ? "bg-success-subtle" : ""}`}>
                    <h1 className={`text-center ${is_perfect ? "text-success" : "text-muted"}`}>
                        <span className="emoji">{is_perfect ? "🌟" : ""}</span>
                        <span className="emoji">{is_gunslinger ? "⚡️" : ""}</span>
                        {name}
                    </h1>
                    {is_timestamped && <span className="text-muted text-end time">{timestamp}</span>}

                    <textarea style={{ resize: "none" }} className="form-control text-center" rows={7} readOnly>
                        {unsanitize(board)}
                    </textarea>
                </div>
            </div>
        </>
    );
};

export default PuzzleCard;
