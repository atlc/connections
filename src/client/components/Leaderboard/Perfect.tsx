import React from "react";
import { sortByColumn } from "../../utilities/sorters";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

/**
 *
 * @returns A table row counting the amount of perfect games a user has played
 */
const Perfect = () => {
    const leaderBoard = useSelector((state: RootState) => state.leaderboard.leaderboard);
    const isDark = useSelector((state: RootState) => state.inputs.darkMode);

    return (
        <tr>
            <th className={isDark ? "text-secondary" : "text-dark"} scope="row">
                Perfect boards:
            </th>
            {sortByColumn({ leaderBoard, column: "perfect" }).map(([name, { perfect }]) => (
                <td className={isDark ? "text-secondary" : "text-dark"} key={`${name}-perfect-leaderboard-rating`}>
                    {name.trim()}: <strong>{perfect}</strong>
                </td>
            ))}
        </tr>
    );
};

export default Perfect;
