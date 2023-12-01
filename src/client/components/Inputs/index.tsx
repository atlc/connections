import React, { useState } from "react";
import NameInput from "./NameInput";
import BoardInput from "./BoardInput";
import type { InputsProps } from "../../types";

/**
 *
 * @returns Input panels for the user's name and the board submission input
 */
const Inputs = ({ updateBoards, updateLeaderboard }: InputsProps) => {
    const [name, setName] = useState("");
    const [hadName, setHadName] = useState(false);
    const [changeName, setChangeName] = useState(false);
    const [showAddBoard, setShowAddBoard] = useState(true);
    const [board, setBoard] = useState("");

    return (
        <div className="row justify-content-center">
            <NameInput
                {...{
                    setName,
                    changeName,
                    setChangeName,
                    setBoard,
                    setHadName,
                    board,
                    name,
                    hadName,
                    updateBoards,
                    updateLeaderboard,
                    showAddBoard,
                    setShowAddBoard,
                }}
            />
            <BoardInput
                {...{ setBoard, board, name, hadName, updateBoards, updateLeaderboard, showAddBoard, setShowAddBoard }}
            />
        </div>
    );
};

export default Inputs;
