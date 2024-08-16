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
import HardModes from "./HardModes";
import PeoplesChamp from "./ThePeoplesChamp";

/**
 *
 * @returns A table consolidating all of the leaderboard metrics
 */
const Leaderboard = () => {
    const leaderBoard = useSelector((state: RootState) => state.leaderboard.leaderboard);
    const isDark = useSelector((state: RootState) => state.inputs.darkMode);

    const submissions = Object.keys(leaderBoard)
        .map((lb) => leaderBoard[lb].total)
        .reduce((a, b) => a + b, 0);

    return (
        <div className="mt-2">
            <h1 className={`text-${isDark ? "secondary" : "dark"}`}>Leaderboard:</h1>
            <h6 className={`text-${isDark ? "secondary" : "dark"}`}>({submissions.toLocaleString()} submissions and counting!)</h6>
            <div className="table-responsive">
                <table className={`table table-sm table-striped table-${isDark ? "dark" : "secondary"} table-bordered`}>
                    <thead>
                        <tr>
                            <th
                                className={`text-center text-${isDark ? "secondary" : "dark"}`}
                                scope="col"
                            >
                                Place
                            </th>
                            {Object.keys(leaderBoard).map((_, i) => (
                                <th
                                    className={`text-center text-${isDark ? "secondary" : "dark"}`}
                                    key={`leaderboard-th-place-${i}`}
                                    scope="col"
                                >
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
                        <PeoplesChamp />
                        <Gunslinger />
                        <HardModes />
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
