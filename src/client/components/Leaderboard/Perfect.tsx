import React, { useState } from "react";
import { ILeaderboard } from "../../App";

interface LeaderboardProps {
    leaderBoard: ILeaderboard;
}
const Perfect = ({ leaderBoard }: LeaderboardProps) => {
    return (
        <tr>
            <th scope="row">Perfect boards:</th>
            {Object.entries(leaderBoard)
                .sort(([prevName, { perfect }], [newName, { perfect: newPerfect }]) => newPerfect - perfect)
                .map(([name, { perfect }]) => (
                    <td>
                        {name.trim()}: <strong>{perfect}</strong>
                    </td>
                ))}
        </tr>
    );
};

export default Perfect;
