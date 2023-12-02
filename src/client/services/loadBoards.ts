import Swal from "sweetalert2";
import type { IBoard, ILeaderboard } from "../types";

export async function loadPastBoards() {
    try {
        const res = await fetch("/api/boards");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        const byDate: { [key: string]: IBoard[] } = {};
        (data as IBoard[]).forEach((b) => {
            if (!byDate[b.number]) {
                byDate[b.number] = [b];
            } else {
                byDate[b.number].push(b);
            }
        });

        const leaders: ILeaderboard = {};
        const days = Object.keys(byDate).reverse();

        days.forEach((day, i) => {
            const isNotFirstDay = i > 0;
            const dayPlayers = [...new Set(byDate[day].map((dayPlayer) => dayPlayer.name))];
            const previousDayPlayers = isNotFirstDay
                ? [...new Set(byDate[days[i - 1]].map((dayPlayer) => dayPlayer.name))]
                : [];

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
            dayBoard.forEach(({ name, is_perfect, is_win }) => {
                if (is_perfect) {
                    leaders[name].perfect += 1;
                }
                if (is_win) {
                    leaders[name].wins += 1;
                }
            });
        });

        return { leaders, byDate };
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
