import Swal from "sweetalert2";
import type { IBoard, ILeaderboard, LeaderboardEntry, LeaderboardEntryExpanded } from "../types";
import { getDateAttributes, getTimeAverage } from "../utilities/parsers";

interface StandardDeviation {
    mean: number;
    population: number;
    user: number;
}

type Extensible<T> = { [key: string]: LeaderboardEntry & { [K in keyof T]: T[K] } };
type LeadersWithAccuracy = Extensible<{ accuracy: number }>;
type LeadersWithAverageTime = Extensible<{ accuracy: number; average: { seconds: number; formatted: string } }>;
type LeadersWithStandardDeviation = Extensible<{
    accuracy: number;
    average: { seconds: number; formatted: string };
    deviation: StandardDeviation;
}>;

export async function loadPastBoards() {
    try {
        const URL_PREFACE = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

        const res = await fetch(`${URL_PREFACE}/api/boards`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        const byDate: { [key: string]: IBoard[] } = {};

        getDateAttributes(data).forEach((b) => {
            if (!byDate[b.number]) {
                byDate[b.number] = [b];
            } else {
                byDate[b.number].push(b);
            }
        });

        const leaders: Extensible<{}> = {};
        const days = Object.keys(byDate).reverse();

        days.forEach((day, i) => {
            const isNotFirstDay = i > 0;

            const dayPlayers = byDate[day].map((dayPlayer) => dayPlayer.name);
            const previousDayPlayers = isNotFirstDay ? byDate[days[i - 1]].map((dayPlayer) => dayPlayer.name) : [];

            for (const player of dayPlayers) {
                const isInLeaderboard = leaders[player];
                const playedYesterday = isNotFirstDay && previousDayPlayers.includes(player);

                if (!isInLeaderboard) {
                    leaders[player] = {
                        total: 1,
                        active: 1,
                        max: 1,
                        perfect: 0,
                        wins: 0,
                        gunslingers: 0,
                        times: [],
                    };
                } else {
                    leaders[player].total += 1;

                    if (!playedYesterday) {
                        leaders[player].active = 1;
                    } else {
                        leaders[player].active += 1;

                        if (leaders[player].active >= leaders[player].max) {
                            leaders[player].max = leaders[player].active;
                        }
                    }
                }
            }

            const dayBoard = byDate[day];
            dayBoard.forEach(({ name, number, is_perfect, is_win, is_gunslinger, time_delta }) => {
                const first_timestamp_day = 172;
                const parsedDay = parseInt(number);

                if (parsedDay && parsedDay > first_timestamp_day) {
                    leaders[name].times.push(time_delta);
                }

                if (is_gunslinger) {
                    leaders[name].gunslingers += 1;
                }

                if (is_perfect) {
                    leaders[name].perfect += 1;
                }
                if (is_win) {
                    leaders[name].wins += 1;
                }
            });
        });

        const leadersWithAllStats = calcAllStats(leaders);

        return { leaders: leadersWithAllStats, byDate };
    } catch (error) {
        Swal.fire({
            title: "Oh no :(",
            text: (error as Error).message,
            icon: "error",
            timer: 10000,
            toast: true,
            position: "top-right",
        });
        throw new Error((error as Error).message);
    }
}

function calcAllStats(leaders: ILeaderboard) {
    return calculateAccuracy(leaders);
}

function calculateAccuracy(leaders: ILeaderboard) {
    const leadersWithAccuracy: LeadersWithAccuracy = {};

    Object.keys(leaders).forEach((name) => {
        const { total, wins } = leaders[name];
        const accuracy = (wins / total) * 100;

        leadersWithAccuracy[name] = {
            ...leaders[name],
            accuracy,
        };
    });
    return calculateAverageTimes(leadersWithAccuracy);
}

function calculateAverageTimes(leaders: LeadersWithAccuracy) {
    const leadersWithAverageTime: LeadersWithAverageTime = {};

    Object.keys(leaders).forEach((player) => {
        const average = getTimeAverage(leaders[player].times);

        leadersWithAverageTime[player] = {
            ...leaders[player],
            average,
        };
    });
    return calculateDeviations(leadersWithAverageTime);
}

function calculateDeviations(leaders: LeadersWithAverageTime) {
    const LENGTH = Object.keys(leaders).length;
    const leadersWithDeviations: LeadersWithStandardDeviation = {};

    let sum = 0;

    Object.keys(leaders).forEach((player) => {
        sum += leaders[player].accuracy;
    });

    const mean = sum / LENGTH;
    let populationDeviationSum = 0;

    Object.keys(leaders).forEach((player) => {
        const difference = leaders[player].accuracy - mean;
        const deviation = Math.pow(difference, 2);

        populationDeviationSum += deviation;
    });

    const populationVariance = populationDeviationSum / LENGTH;
    const populationSD = Math.sqrt(populationVariance);

    Object.keys(leaders).forEach((player) => {
        const deviation = (leaders[player].accuracy - mean) / populationSD;

        leadersWithDeviations[player] = {
            ...leaders[player],
            deviation: {
                user: deviation,
                mean,
                population: populationSD,
            },
        };
    });

    return leadersWithDeviations;
}
