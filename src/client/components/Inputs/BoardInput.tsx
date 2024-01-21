import React from "react";
import { addBoard } from "../../services/addBoard";
import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { setBoard, setShowAddBoard } from "../../store/inputs/inputsSlice";

/**
 *
 * @returns An input to receive the board pasted from the NYT and submit to the server
 */
const BoardInput = () => {
    const dispatch = useDispatch();
    const board = useSelector((state: RootState) => state.inputs.board);
    const showAddBoard = useSelector((state: RootState) => state.inputs.showAddBoard);
    const name = useSelector((state: RootState) => state.inputs.name);
    const hadName = useSelector((state: RootState) => state.inputs.hadName);
    const isDark = useSelector((state: RootState) => state.inputs.darkMode);

    const add = async () => {
        await addBoard({ board, name });
        dispatch(setShowAddBoard(false));
        dispatch(setBoard(""));
    };

    return (
        <>
            {name && hadName && (
                <>
                    {showAddBoard && (
                        <textarea
                            placeholder="Paste your board here exactly as it comes from the NYT"
                            rows={6}
                            style={{ resize: "none" }}
                            className={`my-2 form-control border ${
                                isDark ? "bg-secondary border-secondary" : "bg-white border-white text-dark"
                            }`}
                            value={board}
                            onChange={(e) => dispatch(setBoard(e.target.value))}
                        />
                    )}
                    {board && (
                        <button onClick={add} className="btn btn-secondary">
                            Add board
                        </button>
                    )}
                </>
            )}
        </>
    );
};

export default BoardInput;
