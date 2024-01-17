import React from "react";
import Active from "./Active";
import MaxStreak from "./MaxStreak";
import Perfect from "./Perfect";
import Wins from "./Wins";
import Accuracy from "./Accuracy";
import Gunslinger from "./Gunslinger";
import BestTime from "./BestTime";
import PerfectAccuracy from "./PerfectAccuracy";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import MedianTime from "./MedianTime";

/**
 *
 * @returns A table consolidating all of the leaderboard metrics
 */
const Leaderboard = () => {
    const leaderBoard = useSelector((state: RootState) => state.leaderboard.leaderboard);

    return (
        <div className="mt-2">
            <h1>Leaderboard:</h1>
            <div className="table-responsive">
                <table className="table table-sm table-striped table-secondary table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center" scope="col">
                                Place
                            </th>
                            {Object.keys(leaderBoard).map((_, i) => (
                                <th className="text-center" key={`leaderboard-th-place-${i}`} scope="col">
                                    #{i + 1}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <Wins />
                        <Accuracy />
                        <Perfect />
                        <PerfectAccuracy />
                        <Gunslinger />
                        <MedianTime />
                        <BestTime />
                        <Active />
                        <MaxStreak />
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
