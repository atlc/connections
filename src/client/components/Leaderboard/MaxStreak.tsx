import React from "react";
import { sortByColumn } from "../../utilities/sorters";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

/**
 *
 * @returns A table row for the highest achieved active days in a row
 */
const MaxStreak = () => {
    const leaderBoard = useSelector((state: RootState) => state.leaderboard.leaderboard);

    return (
        <tr>
            <th scope="row">Max streak:</th>
            {sortByColumn({ leaderBoard, column: "active", childColumn: "max" }).map(([name, { active, total }]) => (
                <td key={`${name}-max-leaderboard-rating`}>
                    {name.trim()}: <strong>{active.max}</strong>
                    {active.max === total && <span> (💯)</span>}
                </td>
            ))}
        </tr>
    );
};

export default MaxStreak;
