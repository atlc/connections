import React from "react";
import type { LeaderboardProps } from "../../types";

/**
 *
 * @returns A table row for the actively played days in a row
 */
const Active = ({ leaderBoard }: LeaderboardProps) => {
    return (
        <tr>
            <th scope="row">Active streak:</th>

            {Object.entries(leaderBoard)
                .sort(([prevName, { active }], [newName, { active: newActive }]) => newActive - active)
                .map(([name, { active }]) => (
                    <td>
                        {name.trim()}: <strong>{active}</strong>
                    </td>
                ))}
        </tr>
    );
};

export default Active;
