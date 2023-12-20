import React from "react";
import { sortByColumn } from "../../utilities/sorters";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

/**
 *
 * @returns A table row for the actively played days in a row
 */
const Active = () => {
    const leaderBoard = useSelector((state: RootState) => state.leaderboard.leaderboard);

    return (
        <tr>
            <th scope="row">Active streak:</th>
            {sortByColumn({ leaderBoard, column: "active", childColumn: "active" }).map(([name, { active, total }]) => (
                <td key={`${name}-active-leaderboard-rating`}>
                    {name.trim()}: <strong>{active.active}</strong>
                    {active.active === total && <span> (💯)</span>}
                </td>
            ))}
        </tr>
    );
};

export default Active;
