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
    const isDark = useSelector((state: RootState) => state.inputs.darkMode);

    return (
        <tr>
            <th className={isDark ? "text-secondary" : "text-dark"} scope="row">
                Best Time:
            </th>
            {sortByColumn({ leaderBoard, column: "fastest", childColumn: "seconds", isReversed: true }).map(
                ([name, { fastest }]) => (
                    <td
                        className={isDark ? "text-secondary" : "text-dark"}
                        key={`${name}-fastest-time-leaderboard-rating`}
                    >
                        {name.trim()}: <strong>{fastest.formatted}</strong>
                    </td>
                )
            )}
        </tr>
    );
};

export default BestTime;
