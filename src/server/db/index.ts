import { Query, BoardSubmission } from "./mysql";

const getAll = () => Query("SELECT * FROM Boards GROUP BY number, name ORDER BY id DESC");

const add = ({ name, board, number, is_win, is_perfect }: BoardSubmission) =>
    Query("INSERT INTO Boards SET ?", [{ name, board, number, is_win, is_perfect }]);

export default {
    getAll,
    add,
};
