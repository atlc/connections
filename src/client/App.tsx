import React from "react";
import Leaderboard from "./components/Leaderboard";
import Boards from "./components/Boards";
import Inputs from "./components/Inputs";
import Changelog from "./components/Changelog";

const App = () => {
    return (
        <div className="container">
            <Inputs />
            <Leaderboard />
            <Changelog />
            <Boards />
        </div>
    );
};

export default App;
