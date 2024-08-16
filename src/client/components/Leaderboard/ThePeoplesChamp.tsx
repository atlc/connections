import React from "react";
import { sortByColumn } from "../../utilities/sorters";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

/**
 *
 * @returns A table row counting the amount of times a user was the sole completionist for a perfect board in a given day
 */
const PeoplesChamp = () => {
    const leaderBoard = useSelector((state: RootState) => state.leaderboard.leaderboard);
    const isDark = useSelector((state: RootState) => state.inputs.darkMode);

    return (
        <tr>
            <th
                className={isDark ? "text-secondary" : "text-dark"}
                scope="row"
            >
                People's Champ:
            </th>
            {sortByColumn({ leaderBoard, column: "the_peoples_champ" }).map(([name, { the_peoples_champ }]) => (
                <td
                    className={isDark ? "text-secondary" : "text-dark"}
                    key={`${name}-hard_mode-leaderboard-rating`}
                >
                    {name.trim()}: <strong>{the_peoples_champ}</strong>
                </td>
            ))}
        </tr>
    );
};

export default PeoplesChamp;
