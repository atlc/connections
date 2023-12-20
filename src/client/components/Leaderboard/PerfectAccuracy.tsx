import React from "react";
import type { LeaderboardProps } from "../../types";
import { sortByColumn } from "../../utilities/sorters";

/**
 *
 * @returns A table row sorting the highest to lowest percentage of perfect boards
 */
const PerfectAccuracy = ({ leaderBoard }: LeaderboardProps) => {
    return (
        <tr>
            <th scope="row">Perfect ratio:</th>
            {sortByColumn({ leaderBoard, column: "perfect_accuracy" }).map(([name, { perfect_accuracy }]) => (
                <td key={`${name}-perfect_accuracy-leaderboard-rating`}>
                    {name.trim()}: <strong>{perfect_accuracy.toFixed(2)}%</strong>
                </td>
            ))}
        </tr>
    );
};

export default PerfectAccuracy;
