import React from "react";
import type { LeaderboardProps } from "../../types";
import { sortByColumn } from "../../utilities/sorters";

/**
 *
 * @returns A table row counting the average board submission time for each user
 */
const AverageTime = ({ leaderBoard }: LeaderboardProps) => {
    return (
        <tr>
            <th scope="row">Average Time:</th>
            {sortByColumn({ leaderBoard, column: "average", childColumn: "seconds", isReversed: true }).map(
                ([name, { average }]) => (
                    <td key={`${name}-average-time-leaderboard-rating`}>
                        {name.trim()}: <strong>{average.formatted}</strong>
                    </td>
                )
            )}
        </tr>
    );
};

export default AverageTime;
