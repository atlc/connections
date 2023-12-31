import { FullLeaderboard, LeaderboardEntry } from "../types";

type Deviation = LeaderboardEntry["deviation"];
type Average = LeaderboardEntry["average"];
type Fastest = LeaderboardEntry["fastest"];
type Active = LeaderboardEntry["active"];

type Child = keyof Deviation | keyof Average | keyof Fastest | keyof Active;

interface SorterArgs {
    leaderBoard: FullLeaderboard;
    column: keyof LeaderboardEntry;
    childColumn?: Child | null;
    isReversed?: boolean;
}

export function sortByColumn({ leaderBoard, column, childColumn, isReversed }: SorterArgs) {
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
