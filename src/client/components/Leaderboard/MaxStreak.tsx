import React from "react";
import type { LeaderboardProps } from "../../types";

/**
 *
 * @returns A table row for the highest achieved active days in a row
 */
const MaxStreak = ({ leaderBoard }: LeaderboardProps) => {
    return (
        <tr>
            <th scope="row">Max streak:</th>
            {Object.entries(leaderBoard)
                .sort(([prevName, { max }], [newName, { max: newMax }]) => newMax - max)
                .map(([name, { max }]) => (
                    <td>
                        {name.trim()}: <strong>{max}</strong>
                    </td>
                ))}
        </tr>
    );
};

export default MaxStreak;
