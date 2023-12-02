import React from "react";
import Active from "./Active";
import MaxStreak from "./MaxStreak";
import Perfect from "./Perfect";
import type { LeaderboardProps } from "../../types";
import Wins from "./Wins";
import Accuracy from "./Accuracy";
import Deviations from "./Deviations";

/**
 *
 * @returns A table consolidating all of the leaderboard metrics
 */
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
                        <Wins leaderBoard={leaderBoard} />
                        <Accuracy leaderBoard={leaderBoard} />
                        <Deviations leaderBoard={leaderBoard} />
                        <Perfect leaderBoard={leaderBoard} />
                        <Active leaderBoard={leaderBoard} />
                        <MaxStreak leaderBoard={leaderBoard} />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
