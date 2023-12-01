import React from "react";
import { ILeaderboard } from "../../App";
import Active from "./Active";
import MaxStreak from "./MaxStreak";
import Perfect from "./Perfect";

interface LeaderboardProps {
    leaderBoard: ILeaderboard;
}

const Leaderboard = ({ leaderBoard }: LeaderboardProps) => {
    return (
        <div className="mt-2">
            <h1>Leaderboard:</h1>
            <div className="table-responsive">
                <table className="table table-sm table-striped table-secondary">
                    <thead>
                        <tr>
                            <th scope="col">Place</th>
                            {Object.keys(leaderBoard).map((_, i) => (
                                <th key={`leaderboard-th-place-${i}`} scope="col">
                                    #{i + 1}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <Active leaderBoard={leaderBoard} />
                        <MaxStreak leaderBoard={leaderBoard} />
                        <Perfect leaderBoard={leaderBoard} />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
