import React from "react";
import { RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode } from "../../store/inputs/inputsSlice";

const DarkModeToggle = () => {
    const dispatch = useDispatch();
    const isDark = useSelector((state: RootState) => state.inputs.darkMode);

    const handleToggleDarkMode = () => {
        dispatch(toggleDarkMode(!isDark));
    };

    return (
        <button onClick={handleToggleDarkMode} className="btn btn-secondary">
            <span>{isDark ? "☀️" : "🌙"}</span>
        </button>
    );
};

export default DarkModeToggle;
