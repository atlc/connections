import React from "react";
import { sortByColumn } from "../../utilities/sorters";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

/**
 *
 * @returns A table row counting the average board submission time for each user
 */
const AverageTime = () => {
    const leaderBoard = useSelector((state: RootState) => state.leaderboard.leaderboard);

    return (
        <tr>
            <th scope="row">Average Time:</th>
            {sortByColumn({ leaderBoard, column: "average", childColumn: "seconds", isReversed: true }).map(
                ([name, { average }]) => (
                    <td key={`${name}-average-time-leaderboard-rating`}>
                        {name.trim()}: <strong>{average.formatted}</strong>
                    </td>
                )
            )}
        </tr>
    );
};

export default AverageTime;
