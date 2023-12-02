export interface IBoard {
    id: number;
    name: string;
    board: string;
    number: string;
    created_at: Date;
    is_win: boolean;
    is_perfect: boolean;
}

export interface LeaderboardEntry {
    active: number;
    max: number;
    perfect: number;
    wins: number;
    total: number;
}

export type LeaderboardEntryWithName = [string, LeaderboardEntryExpanded];

export interface LeaderboardEntryExpanded extends LeaderboardEntry {
    accuracy: number;
    deviation: number;
    sd: number;
    difference: number;
}

export interface ILeaderboard {
    [name: string]: LeaderboardEntry;
}

export interface DateSortedBoards {
    [puzzleNum: string]: IBoard[];
}

export interface LoadBoardRes {
    leaders: ILeaderboard;
    byDate: {
        [key: string]: IBoard[];
    };
}

export interface LeaderboardProps {
    leaderBoard: ILeaderboard;
}

export interface InputsProps {
    updateBoards: React.Dispatch<React.SetStateAction<DateSortedBoards>>;
    updateLeaderboard: React.Dispatch<React.SetStateAction<ILeaderboard>>;
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
    updateLeaderboard: React.Dispatch<React.SetStateAction<ILeaderboard>>;
    updateBoards: React.Dispatch<React.SetStateAction<DateSortedBoards>>;
}

export interface BoardInputProps {
    name: string;
    hadName: boolean;
    showAddBoard: boolean;
    setShowAddBoard: React.Dispatch<React.SetStateAction<boolean>>;
    board: string;
    setBoard: React.Dispatch<React.SetStateAction<string>>;
    updateLeaderboard: React.Dispatch<React.SetStateAction<ILeaderboard>>;
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
