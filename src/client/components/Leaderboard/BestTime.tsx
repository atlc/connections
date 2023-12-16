import React from "react";
import type { LeaderboardProps } from "../../types";
import { sortByColumn } from "../../utilities/sorters";

/**
 *
 * @returns A table row ranking the fastest board submission time for each user
 */
const BestTime = ({ leaderBoard }: LeaderboardProps) => {
    return (
        <tr>
            <th scope="row">Best Time:</th>
            {sortByColumn({ leaderBoard, column: "fastest", childColumn: "seconds", isReversed: true }).map(
                ([name, { fastest }]) => (
                    <td key={`${name}-fastest-time-leaderboard-rating`}>
                        {name.trim()}: <strong>{fastest.formatted}</strong>
                    </td>
                )
            )}
        </tr>
    );
};

export default BestTime;
