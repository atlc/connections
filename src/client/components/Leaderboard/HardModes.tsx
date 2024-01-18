import React from "react";
import { sortByColumn } from "../../utilities/sorters";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

/**
 *
 * @returns A table row counting the amount of times a user completed a perfect board in order of hardest -> easiest difficulty
 */
const HardModes = () => {
    const leaderBoard = useSelector((state: RootState) => state.leaderboard.leaderboard);

    return (
        <tr>
            <th scope="row">Hard Modes:</th>
            {sortByColumn({ leaderBoard, column: "hard_modes" }).map(([name, { hard_modes }]) => (
                <td key={`${name}-hard_mode-leaderboard-rating`}>
                    {name.trim()}: <strong>{hard_modes}</strong>
                </td>
            ))}
        </tr>
    );
};

export default HardModes;
