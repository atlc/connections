export interface IBoard {
    id: number;
    name: string;
    board: string;
    number: string;
    created_at: string;
    is_win: boolean;
    is_perfect: boolean;
    is_gunslinger: boolean;
    is_hardmode: boolean;
    timestamp: string;
    time_delta: string;
}

export interface TimeStats {
    seconds: number;
    formatted: string;
}

export interface LeaderboardEntry {
    perfect: number;
    perfect_accuracy: number;
    wins: number;
    total: number;
    gunslingers: number;
    hard_modes: number;
    times: string[];
    accuracy: number;
    active: { max: number; active: number; stopped: number };
    fastest: TimeStats;
    average: TimeStats;
    median: TimeStats;
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

export interface IComment {
    id: number;
    name: string;
    day: string;
    text: string;
    created_at: string;
}

export interface CommentsByDate {
    [day: string]: IComment[];
}
