import React from "react";
import type { LeaderboardProps } from "../../types";
import { sortByColumn } from "../../utilities/sorters";

/**
 *
 * @returns A table row for the highest achieved active days in a row
 */
const MaxStreak = ({ leaderBoard }: LeaderboardProps) => {
    return (
        <tr>
            <th scope="row">Max streak:</th>
            {sortByColumn({ leaderBoard, column: "active", childColumn: "max" }).map(([name, { active, total }]) => (
                <td key={`${name}-max-leaderboard-rating`}>
                    {name.trim()}: <strong>{active.max}</strong>
                    {active.max === total && <span> (💯)</span>}
                </td>
            ))}
        </tr>
    );
};

export default MaxStreak;
