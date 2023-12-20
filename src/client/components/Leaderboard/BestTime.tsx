import React from "react";
import { sortByColumn } from "../../utilities/sorters";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

/**
 *
 * @returns A table row ranking the fastest board submission time for each user
 */
const BestTime = () => {
    const leaderBoard = useSelector((state: RootState) => state.leaderboard.leaderboard);

    return (
        <tr>
            <th scope="row">Best Time:</th>
            {sortByColumn({ leaderBoard, column: "fastest", childColumn: "seconds", isReversed: true }).map(
                ([name, { fastest }]) => (
                    <td key={`${name}-fastest-time-leaderboard-rating`}>
                        {name.trim()}: <strong>{fastest.formatted}</strong>
                    </td>
                )
            )}
        </tr>
    );
};

export default BestTime;
