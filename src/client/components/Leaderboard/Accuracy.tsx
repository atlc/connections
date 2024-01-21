import React from "react";
import { sortByColumn } from "../../utilities/sorters";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
/**
 *
 * @returns A table row ranking users by their accuracy
 */
const Accuracy = () => {
    const leaderBoard = useSelector((state: RootState) => state.leaderboard.leaderboard);
    const isDark = useSelector((state: RootState) => state.inputs.darkMode);

    return (
        <tr>
            <th className={isDark ? "text-secondary" : "text-dark"} scope="row">
                Accuracy:
            </th>
            {sortByColumn({ leaderBoard, column: "accuracy" }).map(([name, { accuracy }]) => (
                <td className={isDark ? "text-secondary" : "text-dark"} key={`${name}-accuracy-leaderboard-rating`}>
                    {name.trim()}: <strong>{accuracy.toFixed(1)}%</strong>
                </td>
            ))}
        </tr>
    );
};

export default Accuracy;
