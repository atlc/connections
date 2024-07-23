import { Query } from "../connection";

export interface BoardSubmission {
    name: string;
    board: string;
    number: string;
    is_win: boolean;
    is_perfect: boolean;
    created_at: string;
}

const getAll = () => Query("SELECT * FROM Boards GROUP BY number, name ORDER BY id DESC");

const add = ({ name, board, number, is_win, is_perfect, created_at }: BoardSubmission) =>
    Query("INSERT INTO Boards SET ?", [{ name, board, number, is_win, is_perfect, created_at }]);

export default {
    add,
    all: getAll,
};
