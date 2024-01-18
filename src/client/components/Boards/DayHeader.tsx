import React, { useState } from "react";
import { DayHeaderProps, IBoard } from "../../types";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { addComment } from "../../services/addComment";

/**
 *
 * @returns A header announcing which puzzle day it is.
 * @returns If all submissions fail, appends "Embarrassing!"
 * @returns If all submissions get a perfect score, appends "Team ACE!"
 */
const DayHeader = ({ day }: DayHeaderProps) => {
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState("");

    const dailyComments = useSelector((state: RootState) => state.comments.comments)[day] || [];
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

    const currentUser = useSelector((state: RootState) => state.inputs.name);
    const MAX_COMMENT_LENGTH = 256;

    const handleAddComment = () => {
        if (!comment) return;
        addComment({ name: currentUser, day, comment });
        setComment("");
    };

    return (
        <>
            <h1 className="text-center">
                <span onClick={() => setShowComments(!showComments)} className="btn btn-secondary mx-2">
                    {showComments ? "Hide Comments" : "Show Comments"}
                </span>
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
            {showComments && (
                <div className="row justify-content-center">
                    <div className="col-8">
                        <div className="input-group">
                            <input
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder='Ugh, the "Chemistry Terms" killed me!!'
                                className="form-control"
                                type="text"
                                maxLength={MAX_COMMENT_LENGTH}
                            />
                            <button onClick={handleAddComment} className="btn btn-secondary">
                                Add Comment{" "}
                                <span className="fw-bold">
                                    {comment.length}/{MAX_COMMENT_LENGTH}
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="col-8">
                        {dailyComments.map((dc) => (
                            <div
                                key={`${dc.name}-comment-${dc.id}`}
                                className={`mw-100 my-1 rounded-3 ${
                                    currentUser === dc.name
                                        ? "bg-secondary-subtle text-end"
                                        : "bg-success-subtle text-start"
                                }`}
                            >
                                {currentUser !== dc.name && <span className="d-block fw-bold">{dc.name}</span>}
                                <span>
                                    {dc.text}{" "}
                                    <span className="fw-light">({new Date(dc.created_at).toLocaleTimeString()})</span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default DayHeader;
