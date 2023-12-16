export interface IBoard extends BoardTimeAttributes {
    id: number;
    name: string;
    board: string;
    number: string;
    created_at: string;
    is_win: boolean;
    is_perfect: boolean;
}

export interface BoardTimeAttributes {
    is_gunslinger: boolean;
    timestamp: string;
    time_delta: string;
}

export interface LeaderboardEntry {
    perfect: number;
    wins: number;
    total: number;
    gunslingers: number;
    times: string[];
    accuracy: number;
    active: { max: number; active: number; stopped: number };
    fastest: { seconds: number; formatted: string };
    average: { seconds: number; formatted: string };
    deviation: { mean: number; population: number; user: number };
}

export type FullLeaderboard = { [key: string]: LeaderboardEntry };

export interface DateSortedBoards {
    [puzzleNum: string]: IBoard[];
}

export interface LeaderboardProps {
    leaderBoard: FullLeaderboard;
}

export interface InputsProps {
    updateBoards: React.Dispatch<React.SetStateAction<DateSortedBoards>>;
    updateLeaderboard: React.Dispatch<React.SetStateAction<FullLeaderboard>>;
}

export interface NameInputProps {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setHadName: React.Dispatch<React.SetStateAction<boolean>>;
    board: string;
    showAddBoard: boolean;
    setShowAddBoard: React.Dispatch<React.SetStateAction<boolean>>;
    hadName: boolean;
    changeName: boolean;
    setChangeName: React.Dispatch<React.SetStateAction<boolean>>;
    updateLeaderboard: React.Dispatch<React.SetStateAction<FullLeaderboard>>;
    updateBoards: React.Dispatch<React.SetStateAction<DateSortedBoards>>;
}

export interface BoardInputProps {
    name: string;
    hadName: boolean;
    showAddBoard: boolean;
    setShowAddBoard: React.Dispatch<React.SetStateAction<boolean>>;
    board: string;
    setBoard: React.Dispatch<React.SetStateAction<string>>;
    updateLeaderboard: React.Dispatch<React.SetStateAction<FullLeaderboard>>;
    updateBoards: React.Dispatch<React.SetStateAction<DateSortedBoards>>;
}

export interface BoardsProps {
    boards: DateSortedBoards;
}

export interface BoardCardProps {
    board: IBoard;
}

export interface DayHeaderProps {
    boards: DateSortedBoards;
    day: string;
}
