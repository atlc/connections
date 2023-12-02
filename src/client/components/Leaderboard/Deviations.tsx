import React from "react";
import type { LeaderboardEntryExpanded, LeaderboardEntryWithName, LeaderboardProps } from "../../types";

/**
 *
 * @returns A table row ranking users by their accuracy standard deviation
 */
const Deviations = ({ leaderBoard }: LeaderboardProps) => {
    const boardWithAccuracy = Object.entries(leaderBoard).map((lb) => {
        const name = lb[0];
        const vals = {
            ...lb[1],
            accuracy: (lb[1].wins / lb[1].total) * 100,
        };
        return [name, { ...vals }] as LeaderboardEntryWithName;
    });

    const sum = boardWithAccuracy.map(([n, { accuracy }]) => accuracy).reduce((a, b) => a + b, 0);
    const length = boardWithAccuracy.length;
    const mean = sum / length;

    const withIndividualDeviations = boardWithAccuracy.map(([name, lbe]) => {
        const difference = lbe.accuracy - mean;
        const deviation = Math.pow(difference, 2);
        console.log({ acc: lbe.accuracy, mean, difference, deviation });
        return [name, { ...lbe, deviation, difference }] as LeaderboardEntryWithName;
    });

    const deviationSum = withIndividualDeviations.map(([n, { deviation }]) => deviation).reduce((a, b) => a + b, 0);
    const variance = deviationSum / length;
    const populationStandardDeviation = Math.sqrt(variance);

    const withSD = withIndividualDeviations.map(([n, lbe]) => {
        const sd = (lbe.accuracy - mean) / populationStandardDeviation;
        return [n, { ...lbe, sd }] as LeaderboardEntryWithName;
    });

    console.log({ sum, mean, deviationSum, variance, populationStandardDeviation });
    console.log(withSD);

    return (
        <tr>
            <th scope="row">
                Accuracy Deviation (μ={mean.toFixed(1)}, σ={populationStandardDeviation.toFixed(2)}):
            </th>
            {withSD
                .sort(([prevName, { sd }], [newName, { sd: newDeviation }]) => newDeviation - sd)
                .map(([name, { sd, difference }]) => (
                    <td>
                        {name.trim()}: <strong>{sd.toFixed(2)} sd</strong>
                    </td>
                ))}
        </tr>
    );
};

export default Deviations;
