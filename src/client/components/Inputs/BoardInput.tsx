import React from "react";
import { addBoard } from "../../services/addBoard";
import type { BoardInputProps, LoadBoardRes } from "../../types";

/**
 *
 * @returns An input to receive the board pasted from the NYT and submit to the server
 */
const BoardInput = (props: BoardInputProps) => {
    const { name, hadName, showAddBoard, setShowAddBoard, board, setBoard, updateBoards, updateLeaderboard } = props;

    const add = async () => {
        const { leaders, byDate } = (await addBoard({ board, name })) as LoadBoardRes;

        updateLeaderboard(leaders);
        updateBoards(byDate);
        setShowAddBoard(false);
        setBoard("");
    };

    return (
        <>
            {name && hadName && (
                <div className="card my-1">
                    {showAddBoard && (
                        <textarea
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    add();
                                }
                            }}
                            placeholder="Paste your board in here exactly as it comes from the NYT"
                            rows={6}
                            style={{ resize: "none" }}
                            className="form-control"
                            value={board}
                            onChange={(e) => setBoard(e.target.value)}
                        />
                    )}
                    {board && (
                        <button onClick={add} className="btn btn-secondary">
                            Add board
                        </button>
                    )}
                </div>
            )}
        </>
    );
};

export default BoardInput;
