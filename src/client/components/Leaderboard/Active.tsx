import React from "react";
import type { LeaderboardProps } from "../../types";
import { sortByColumn } from "../../utilities/sorters";

/**
 *
 * @returns A table row for the actively played days in a row
 */
const Active = ({ leaderBoard }: LeaderboardProps) => {
    console.log({ leaderBoard });

    return (
        <tr>
            <th scope="row">Active streak:</th>
            {sortByColumn({ leaderBoard, column: "active", childColumn: "active" }).map(([name, { active, total }]) => (
                <td key={`${name}-active-leaderboard-rating`}>
                    {name.trim()}: <strong>{active.active}</strong>
                    {active.active === total && <span> (💯)</span>}
                </td>
            ))}
        </tr>
    );
};

export default Active;
