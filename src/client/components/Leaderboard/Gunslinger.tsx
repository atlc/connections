import React from "react";
import type { LeaderboardProps } from "../../types";

/**
 *
 * @returns A table row counting the amount of times a user was the first to submit
 */
const Gunslingers = ({ leaderBoard }: LeaderboardProps) => {
    return (
        <tr>
            <th scope="row">Gunslingers:</th>
            {Object.entries(leaderBoard)
                .sort(
                    ([prevName, { gunslingers }], [newName, { gunslingers: newGunslinger }]) =>
                        newGunslinger - gunslingers
                )
                .map(([name, { gunslingers }]) => (
                    <td>
                        {name.trim()}: <strong>{gunslingers}</strong>
                    </td>
                ))}
        </tr>
    );
};

export default Gunslingers;
