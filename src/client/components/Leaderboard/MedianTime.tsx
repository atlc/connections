import React from "react";
import { sortByColumn } from "../../utilities/sorters";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

/**
 *
 * @returns A table row counting the median board submission time for each user
 */
const MedianTime = () => {
    const leaderBoard = useSelector((state: RootState) => state.leaderboard.leaderboard);

    return (
        <tr>
            <th scope="row">Median Time:</th>
            {sortByColumn({ leaderBoard, column: "median", childColumn: "seconds", isReversed: true }).map(
                ([name, { median, average }]) => (
                    <td key={`${name}-median-time-leaderboard-rating`}>
                        {name.trim()}: <strong>{median.formatted}</strong>{" "}
                        <span style={{ fontSize: "0.75rem" }}>(avg: {average.formatted})</span>
                    </td>
                )
            )}
        </tr>
    );
};

export default MedianTime;
