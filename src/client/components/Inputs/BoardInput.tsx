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

    const add = async () => {
        await addBoard({ board, name });
        dispatch(setShowAddBoard(false));
        dispatch(setBoard(""));
    };

    return (
        <>
            {name && hadName && (
                <div className="card my-1">
                    {showAddBoard && (
                        <textarea
                            placeholder="Paste your board in here exactly as it comes from the NYT"
                            rows={6}
                            style={{ resize: "none" }}
                            className="form-control"
                            value={board}
                            onChange={(e) => dispatch(setBoard(e.target.value))}
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
