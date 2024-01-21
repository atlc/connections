import React from "react";
import { sortByColumn } from "../../utilities/sorters";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

/**
 *
 * @returns A table row sorting the highest to lowest percentage of perfect boards
 */
const PerfectAccuracy = () => {
    const leaderBoard = useSelector((state: RootState) => state.leaderboard.leaderboard);
    const isDark = useSelector((state: RootState) => state.inputs.darkMode);

    return (
        <tr>
            <th className={isDark ? "text-secondary" : "text-dark"} scope="row">
                Perfect ratio:
            </th>
            {sortByColumn({ leaderBoard, column: "perfect_accuracy" }).map(([name, { perfect_accuracy }]) => (
                <td
                    className={isDark ? "text-secondary" : "text-dark"}
                    key={`${name}-perfect_accuracy-leaderboard-rating`}
                >
                    {name.trim()}: <strong>{perfect_accuracy.toFixed(1)}%</strong>
                </td>
            ))}
        </tr>
    );
};

export default PerfectAccuracy;
