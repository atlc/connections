import React from "react";
import type { LeaderboardProps } from "../../types";
import { sortByColumn } from "../../utilities/sorters";

/**
 *
 * @returns A table row counting the amount of times a user was the first to submit
 */
const Gunslingers = ({ leaderBoard }: LeaderboardProps) => {
    return (
        <tr>
            <th scope="row">Gunslingers:</th>
            {sortByColumn(leaderBoard, "gunslingers").map(([name, { gunslingers }]) => (
                <td key={`${name}-gunslinger-leaderboard-rating`}>
                    {name.trim()}: <strong>{gunslingers}</strong>
                </td>
            ))}
        </tr>
    );
};

export default Gunslingers;
