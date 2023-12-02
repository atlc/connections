import React from "react";
import type { LeaderboardProps } from "../../types";

/**
 *
 * @returns A table row counting the amount of total wins for a user
 */
const Wins = ({ leaderBoard }: LeaderboardProps) => {
    return (
        <tr>
            <th scope="row">Total Wins:</th>
            {Object.entries(leaderBoard)
                .sort(([prevName, { wins }], [newName, { wins: newWins }]) => newWins - wins)
                .map(([name, { wins, total }]) => (
                    <td>
                        {name.trim()}: <strong>{wins}</strong>/{total}
                    </td>
                ))}
        </tr>
    );
};

export default Wins;
