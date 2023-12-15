import React from "react";
import type { LeaderboardProps } from "../../types";
import { sortByColumn } from "../../utilities/sorters";

/**
 *
 * @returns A table row for the actively played days in a row
 */
const Active = ({ leaderBoard }: LeaderboardProps) => {
    return (
        <tr>
            <th scope="row">Active streak:</th>
            <td className="text-end">
                <strong>Under</strong>
            </td>
            <td>
                <strong>Construction</strong>
            </td>
            <td className="text-end">
                <strong>(Max Streak</strong>
            </td>
            <td>
                <strong>still works</strong>)
            </td>
            {/* {sortByColumn(leaderBoard, "active").map(([name, { active }]) => (
                <td key={`${name}-active-leaderboard-rating`}>
                    {name.trim()}: <strong>{active}</strong>
                </td>
            ))} */}
        </tr>
    );
};

export default Active;
