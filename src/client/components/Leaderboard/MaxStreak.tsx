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
            {sortByColumn({ leaderBoard, column: "max" }).map(([name, { max, wins }]) => (
                <td key={`${name}-max-leaderboard-rating`}>
                    {name.trim()}: <strong>{max}</strong> {max === wins && <em>(Perfect attendance!)</em>}
                </td>
            ))}
        </tr>
    );
};

export default MaxStreak;
