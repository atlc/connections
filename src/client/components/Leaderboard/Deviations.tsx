import React from "react";
import { sortByColumn } from "../../utilities/sorters";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

/**
 *
 * @returns A table row ranking users by their accuracy standard deviation
 */
const Deviations = () => {
    const leaderBoard = useSelector((state: RootState) => state.leaderboard.leaderboard);

    return (
        <tr>
            <th scope="row">
                Accuracy Deviation (μ={leaderBoard[Object.keys(leaderBoard)[0]]?.deviation.mean.toFixed(1)}, σ=
                {leaderBoard[Object.keys(leaderBoard)[0]]?.deviation.population.toFixed(2)}):
            </th>
            {sortByColumn({ leaderBoard, column: "deviation", childColumn: "user" }).map(([name, { deviation }]) => (
                <td key={`${name}-deviation-leaderboard-rating`}>
                    {name.trim()}: <strong>{deviation.user.toFixed(2)} sd</strong>
                </td>
            ))}
        </tr>
    );
};

export default Deviations;
