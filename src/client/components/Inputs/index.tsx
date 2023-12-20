import React from "react";
import NameInput from "./NameInput";
import BoardInput from "./BoardInput";

/**
 *
 * @returns Input panels for the user's name and the board submission input
 */
const Inputs = () => {
    return (
        <div className="row justify-content-center">
            <NameInput />
            <BoardInput />
        </div>
    );
};

export default Inputs;
