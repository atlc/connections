import React from "react";
import type { LeaderboardEntryExpanded, LeaderboardProps } from "../../types";

/**
 *
 * @returns A table row ranking users by their accuracy
 */
const Accuracy = ({ leaderBoard }: LeaderboardProps) => {
    return (
        <tr>
            <th scope="row">Accuracy:</th>
            {Object.entries(leaderBoard)
                .map((lb) => {
                    const name = lb[0];
                    const vals = {
                        ...lb[1],
                        accuracy: lb[1].wins / lb[1].total,
                    };
                    return [name, { ...vals }] as [string, LeaderboardEntryExpanded];
                })
                .sort(([prevName, { accuracy }], [newName, { accuracy: newAccuracy }]) => newAccuracy - accuracy)
                .map(([name, { accuracy }]) => (
                    <td>
                        {name.trim()}: <strong>{(accuracy * 100).toFixed(1)}%</strong>
                    </td>
                ))}
        </tr>
    );
};

export default Accuracy;
