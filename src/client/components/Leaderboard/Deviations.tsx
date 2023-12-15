import React from "react";
import type { LeaderboardProps } from "../../types";
import { sortByColumn } from "../../utilities/sorters";

/**
 *
 * @returns A table row ranking users by their accuracy standard deviation
 */
const Deviations = ({ leaderBoard }: LeaderboardProps) => {
    return (
        <tr>
            <th scope="row">
                Accuracy Deviation (μ={leaderBoard[Object.keys(leaderBoard)[0]].deviation.mean.toFixed(1)}, σ=
                {leaderBoard[Object.keys(leaderBoard)[0]].deviation.population.toFixed(2)}):
            </th>
            {sortByColumn(leaderBoard, "deviation", "user").map(([name, { deviation }]) => (
                <td key={`${name}-deviation-leaderboard-rating`}>
                    {name.trim()}: <strong>{deviation.user.toFixed(2)} sd</strong>
                </td>
            ))}
        </tr>
    );
};

export default Deviations;
