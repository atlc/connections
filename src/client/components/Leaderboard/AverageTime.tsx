import React from "react";
import type { LeaderboardEntryWithAverage, LeaderboardProps } from "../../types";
import { getTimeAverage } from "../../utilities/parsers";

/**
 *
 * @returns A table row counting the average board submission time for each user
 */
const AverageTime = ({ leaderBoard }: LeaderboardProps) => {
    const flattenedAverage = Object.entries(leaderBoard).map(([name, lbe]) => {
        const entry = {
            ...lbe,
            average: getTimeAverage(lbe.times),
        };
        return [name, entry];
    }) as unknown as LeaderboardEntryWithAverage[];

    return (
        <tr>
            <th scope="row">Average Time:</th>
            {flattenedAverage
                .sort((a, b) => a[1].average.seconds - b[1].average.seconds)
                .map(([name, { average }]) => (
                    <td>
                        {name.trim()}: <strong>{average.formatted}</strong>
                    </td>
                ))}
        </tr>
    );
};

export default AverageTime;
