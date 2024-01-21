import React, { useEffect } from "react";
import { loadPastBoards } from "../../services/loadBoards";
import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { setShowAddBoard, setName, setHadName, setShouldChangeName } from "../../store/inputs/inputsSlice";
import DarkModeToggle from "./DarkModeToggle";
import LocalStorage from "../../services/LocalStorage";

/**
 *
 * @returns An input to set or update a user's name, or set it from localStorage if previously played
 */
const NameInput = () => {
    const dispatch = useDispatch();
    const board = useSelector((state: RootState) => state.inputs.board);
    const showAddBoard = useSelector((state: RootState) => state.inputs.showAddBoard);
    const name = useSelector((state: RootState) => state.inputs.name);
    const hadName = useSelector((state: RootState) => state.inputs.hadName);
    const changeName = useSelector((state: RootState) => state.inputs.changeName);
    const isDark = useSelector((state: RootState) => state.inputs.darkMode);

    useEffect(() => {
        const lsName = LocalStorage.name.get();
        if (lsName) {
            dispatch(setName(lsName));
            dispatch(setHadName(true));
        }

        loadPastBoards();
    }, []);

    function handleNameChange() {
        LocalStorage.name.set(name);
        dispatch(setHadName(true));
        dispatch(setShouldChangeName(false));
    }

    return (
        <div className={`mt-2 card ${isDark ? "bg-dark-subtle" : "bg-white"} p-2`}>
            <div>
                {!board && (
                    <button onClick={() => dispatch(setShowAddBoard(!showAddBoard))} className="btn btn-secondary m-2">
                        {showAddBoard ? "Hide board input?" : "Show board input?"}
                    </button>
                )}
                {hadName && !changeName && (
                    <button onClick={() => dispatch(setShouldChangeName(true))} className="btn btn-secondary m-2">
                        Change name? ({name})
                    </button>
                )}
                <DarkModeToggle />
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
                        onChange={(e) => dispatch(setName(e.target.value))}
                        type="text"
                        placeholder="Ken Jennings"
                        className={`form-control`}
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
