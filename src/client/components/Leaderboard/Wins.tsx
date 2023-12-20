import React from "react";
import { sortByColumn } from "../../utilities/sorters";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

/**
 *
 * @returns A table row counting the amount of total wins for a user
 */
const Wins = () => {
    const leaderBoard = useSelector((state: RootState) => state.leaderboard.leaderboard);

    return (
        <tr>
            <th scope="row">Total Wins:</th>
            {sortByColumn({ leaderBoard, column: "wins" }).map(([name, { wins, total }]) => (
                <td key={`${name}-wins-leaderboard-rating`}>
                    {name.trim()}: <strong>{wins}</strong>/{total}
                </td>
            ))}
        </tr>
    );
};

export default Wins;
