import React, { useState } from "react";
import Leaderboard from "./components/Leaderboard";
import Boards from "./components/Boards";
import Inputs from "./components/Inputs";
import type { DateSortedBoards, ILeaderboard } from "./types";

const App = () => {
    const [boards, setBoards] = useState<DateSortedBoards>({});
    const [leaderBoard, setLeaderboard] = useState<ILeaderboard>({});

    return (
        <div className="container">
            <Inputs updateLeaderboard={setLeaderboard} updateBoards={setBoards} />
            <Leaderboard leaderBoard={leaderBoard} />
            <Boards boards={boards} />
        </div>
    );
};

export default App;
