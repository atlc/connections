export interface IBoard {
    id: number;
    name: string;
    board: string;
    number: string;
    created_at: string;
    is_win: boolean;
    is_perfect: boolean;
    is_gunslinger: boolean;
    timestamp: string;
    time_delta: string;
}

export interface LeaderboardEntry {
    perfect: number;
    perfect_accuracy: number;
    wins: number;
    total: number;
    gunslingers: number;
    times: string[];
    accuracy: number;
    active: { max: number; active: number; stopped: number };
    fastest: { seconds: number; formatted: string };
    average: { seconds: number; formatted: string };
    median: { seconds: number; formatted: string };
    deviation: { mean: number; population: number; user: number };
}

export type FullLeaderboard = { [key: string]: LeaderboardEntry };

export interface DateSortedBoards {
    [puzzleNum: string]: IBoard[];
}

export interface BoardCardProps {
    board: IBoard;
}

export interface DayHeaderProps {
    day: string;
}
