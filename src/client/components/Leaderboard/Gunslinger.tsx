import React from "react";
import { sortByColumn } from "../../utilities/sorters";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

/**
 *
 * @returns A table row counting the amount of times a user was the first to submit a correct solution
 */
const Gunslingers = () => {
    const leaderBoard = useSelector((state: RootState) => state.leaderboard.leaderboard);

    return (
        <tr>
            <th scope="row">Gunslingers:</th>
            {sortByColumn({ leaderBoard, column: "gunslingers" }).map(([name, { gunslingers }]) => (
                <td key={`${name}-gunslinger-leaderboard-rating`}>
                    {name.trim()}: <strong>{gunslingers}</strong>
                </td>
            ))}
        </tr>
    );
};

export default Gunslingers;
