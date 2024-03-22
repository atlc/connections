import { Query } from "../connection";

export interface BoardSubmission {
    name: string;
    board: string;
    number: string;
    is_win: boolean;
    is_perfect: boolean;
}

const getAll = () => Query("SELECT * FROM Boards GROUP BY number, name ORDER BY id DESC");

const add = ({ name, board, number, is_win, is_perfect }: BoardSubmission) => Query("INSERT INTO Boards SET ?", [{ name, board, number, is_win, is_perfect }]);

export default {
    add,
    all: getAll,
};
