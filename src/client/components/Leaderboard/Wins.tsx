import React from "react";
import type { LeaderboardProps } from "../../types";
import { sortByColumn } from "../../utilities/sorters";

/**
 *
 * @returns A table row counting the amount of total wins for a user
 */
const Wins = ({ leaderBoard }: LeaderboardProps) => {
    return (
        <tr>
            <th scope="row">Total Wins:</th>
            {sortByColumn(leaderBoard, "wins").map(([name, { wins, total }]) => (
                <td key={`${name}-wins-leaderboard-rating`}>
                    {name.trim()}: <strong>{wins}</strong>/{total}
                </td>
            ))}
        </tr>
    );
};

export default Wins;
