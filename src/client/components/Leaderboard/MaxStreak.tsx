import React from "react";
import { ILeaderboard } from "../../App";

interface LeaderboardProps {
    leaderBoard: ILeaderboard;
}
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
