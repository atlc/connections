import React from "react";
import Leaderboard from "./components/Leaderboard";
import Boards from "./components/Boards";
import Inputs from "./components/Inputs";

const App = () => {
    return (
        <div className="container">
            <Inputs />
            <Leaderboard />
            <Boards />
        </div>
    );
};

export default App;
