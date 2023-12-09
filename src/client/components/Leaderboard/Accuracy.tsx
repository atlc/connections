import React from "react";
import type { LeaderboardProps } from "../../types";
import { sortByColumn } from "../../utilities/sorters";

/**
 *
 * @returns A table row ranking users by their accuracy
 */
const Accuracy = ({ leaderBoard }: LeaderboardProps) => {
    return (
        <tr>
            <th scope="row">Accuracy:</th>
            {sortByColumn(leaderBoard, "accuracy").map(([name, { accuracy }]) => (
                <td key={`${name}-accuracy-leaderboard-rating`}>
                    {name.trim()}: <strong>{accuracy.toFixed(1)}%</strong>
                </td>
            ))}
        </tr>
    );
};

export default Accuracy;
