import React from "react";
import { BoardCardProps } from "../../types";
import { unsanitize } from "../../utilities/parsers";

/**
 *
 * @returns A card consisting of an individual user's submission for the day
 */
const PuzzleCard = ({ board }: BoardCardProps) => {
    return (
        <>
            <div key={`${board.name}-puzzle-card-${board.id}`} className="my-1 col-6 col-md-4 col-lg-3">
                <div className={`card p-1 shadow-lg ${board.is_perfect ? "bg-success-subtle" : ""}`}>
                    <h1 className={`text-center ${board.is_perfect ? "text-success" : "text-muted"}`}>
                        {board.name} {board.is_perfect ? "🌟" : ""}
                    </h1>
                    <textarea style={{ resize: "none" }} className="form-control text-center" rows={7} readOnly>
                        {unsanitize(board.board)}
                    </textarea>
                </div>
            </div>
        </>
    );
};

export default PuzzleCard;
