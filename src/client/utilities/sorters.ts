import { FullLeaderboard, LeaderboardEntry } from "../types";

type Deviation = LeaderboardEntry["deviation"];
type Average = LeaderboardEntry["average"];

type Parent = Deviation | Average;
type Child = keyof Deviation | keyof Average;

export function sortByColumn(
    leaderBoard: FullLeaderboard,
    column: keyof LeaderboardEntry,
    childColumn?: Child,
    isReversed: boolean = false
) {
    if (!childColumn) {
        const sorted = Object.entries(leaderBoard).sort(
            ([prevName, prevBoard], [newName, newBoard]) => (newBoard[column] as any) - (prevBoard[column] as any)
        );
        return isReversed ? sorted.reverse() : sorted;
    } else {
        const sorted = Object.entries(leaderBoard).sort(
            // @ts-ignore
            ([name, board], [newName, newBoard]) => newBoard[column][childColumn] - board[column][childColumn]
        );
        return isReversed ? sorted.reverse() : sorted;
    }
}
