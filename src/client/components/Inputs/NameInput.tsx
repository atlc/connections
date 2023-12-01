import React, { useEffect } from "react";
import { loadPastBoards } from "../../services/loadBoards";
import type { NameInputProps } from "../../types";

/**
 *
 * @returns An input to set or update a user's name, or set it from localStorage if previously played
 */
const NameInput = (props: NameInputProps) => {
    const { name, setName, setHadName, board, showAddBoard, setShowAddBoard } = props;
    const { hadName, changeName, setChangeName, updateBoards, updateLeaderboard } = props;

    useEffect(() => {
        const lsName = localStorage.getItem("name");
        if (lsName) {
            setName(lsName);
            setHadName(true);
        }

        loadPastBoards().then(({ leaders, byDate }) => {
            updateLeaderboard(leaders);
            updateBoards(byDate);
        });
    }, []);

    function handleNameChange() {
        localStorage.setItem("name", name);
        setHadName(true);
        setChangeName(false);
    }

    return (
        <div className="mt-2 card bg-white p-2">
            <div>
                {!board && (
                    <button onClick={() => setShowAddBoard(!showAddBoard)} className="btn btn-secondary m-2">
                        {showAddBoard ? "Hide board input?" : "Show board input?"}
                    </button>
                )}
                {hadName && !changeName && (
                    <button onClick={() => setChangeName(true)} className="btn btn-secondary m-2">
                        Change name? ({name})
                    </button>
                )}
            </div>
            <h1>{!hadName && "Whose board is this?"}</h1>
            {(!hadName || changeName) && (
                <>
                    <input
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleNameChange();
                            }
                        }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Ken Jennings"
                        className="form-control"
                    />
                    <button onClick={handleNameChange} className="btn btn-secondary mt-4">
                        {hadName ? "Update name?" : "Set name"}
                    </button>
                </>
            )}
        </div>
    );
};

export default NameInput;
