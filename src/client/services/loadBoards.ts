import Swal from "sweetalert2";
import type { CommentsByDate, FullLeaderboard, IBoard, IComment, LeaderboardEntry } from "../types";
import { getBestTime, getMedianTime, getTimeAverage } from "../utilities/parsers";
import { store } from "../store";
import { set_from_api } from "../store/boards/boardsSlice";
import { set_leaderboard } from "../store/leaderboard/leaderboardSlice";
import { sort_and_set_comments } from "../store/comments/commentsSlice";

const URL_PREFACE = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

export async function loadComments() {
    const res = await fetch(`${URL_PREFACE}/api/boards/comments`);
    const data: IComment[] = await res.json();
    if (!res.ok) throw new Error((data as unknown as Error).message);
    store.dispatch(sort_and_set_comments(data));
}

export async function loadPastBoards() {
    try {
        const res = await fetch(`${URL_PREFACE}/api/boards`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        store.dispatch(set_from_api(data));

        await loadComments();

        const allStore = store.getState().boards;
        const byDate = allStore.boards;

        const leaders: FullLeaderboard = {};
        const days = Object.keys(byDate);
        const allPlayers = [...new Set(days.map((day) => byDate[day].map((board) => board.name)).flat())];

        const initialPlayerState: LeaderboardEntry = {
            total: 0,
            perfect: 0,
            perfect_accuracy: 0,
            accuracy: 0,
            wins: 0,
            gunslingers: 0,
            hard_modes: 0,
            times: [],
            active: { active: 0, max: 0, stopped: 0 },
            fastest: { seconds: 0, formatted: "" },
            average: { seconds: 0, formatted: "" },
            median: { seconds: 0, formatted: "" },
            deviation: { mean: 0, population: 0, user: 0 },
        };

        for (const player of allPlayers) {
            leaders[player] = JSON.parse(JSON.stringify(initialPlayerState));
        }

        days.forEach((day, i) => {
            const dayPlayers = byDate[day].map((dayPlayer) => dayPlayer.name);
            for (const player of allPlayers) {
                if (dayPlayers.includes(player)) {
                    // Increment the total days played and the active streak
                    leaders[player].total += 1;
                    leaders[player].active.active += 1;

                    // If the active streak meets or exceeds the max, update max to the active streak
                    if (leaders[player].active.active >= leaders[player].active.max) {
                        leaders[player].active.max = leaders[player].active.active;
                    }
                } else {
                    // If the player has played before and *the* active streak has not been frozen
                    if (leaders[player].active.active && !leaders[player].active.stopped) {
                        leaders[player].active.stopped = leaders[player].active.active;
                    }
                    // If the player did not play today, reset the active streak
                    leaders[player].active.active = 0;
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

        store.dispatch(set_leaderboard(leadersWithAllStats));
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

function calcAllStats(leaders: FullLeaderboard) {
    return calculateAccuracy(leaders);
}

function calculateAccuracy(leaders: FullLeaderboard) {
    const leadersWithAccuracy: FullLeaderboard = {};

    Object.keys(leaders).forEach((name) => {
        const { total, wins, perfect } = leaders[name];

        const accuracy = (wins / total) * 100;
        const perfect_accuracy = (perfect / total) * 100;

        leadersWithAccuracy[name] = {
            ...leaders[name],
            accuracy,
            perfect_accuracy,
        };
    });
    return calculateTimes(leadersWithAccuracy);
}

function calculateTimes(leaders: FullLeaderboard) {
    const leadersWithAverageTime: FullLeaderboard = {};

    Object.keys(leaders).forEach((player) => {
        const average = getTimeAverage(leaders[player].times);
        const median = getMedianTime(leaders[player].times);
        const fastest = getBestTime(leaders[player].times);

        leadersWithAverageTime[player] = {
            ...leaders[player],
            fastest,
            average,
            median,
        };
    });
    return calculateDeviations(leadersWithAverageTime);
}

function calculateDeviations(leaders: FullLeaderboard) {
    const LENGTH = Object.keys(leaders).length;
    const leadersWithDeviations: FullLeaderboard = {};

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
