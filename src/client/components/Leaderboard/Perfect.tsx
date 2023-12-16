import React from "react";
import type { LeaderboardProps } from "../../types";
import { sortByColumn } from "../../utilities/sorters";

/**
 *
 * @returns A table row counting the amount of perfect games a user has played
 */
const Perfect = ({ leaderBoard }: LeaderboardProps) => {
    return (
        <tr>
            <th scope="row">Perfect boards:</th>
            {sortByColumn({ leaderBoard, column: "perfect" }).map(([name, { perfect }]) => (
                <td key={`${name}-perfect-leaderboard-rating`}>
                    {name.trim()}: <strong>{perfect}</strong>
                </td>
            ))}
        </tr>
    );
};

export default Perfect;
