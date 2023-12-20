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

    return (
        <tr>
            <th scope="row">Accuracy:</th>
            {sortByColumn({ leaderBoard, column: "accuracy" }).map(([name, { accuracy }]) => (
                <td key={`${name}-accuracy-leaderboard-rating`}>
                    {name.trim()}: <strong>{accuracy.toFixed(1)}%</strong>
                </td>
            ))}
        </tr>
    );
};

export default Accuracy;
