import { Query, BoardSubmission, ICommentSubmission } from "./mysql";

const getAll = () => Query("SELECT * FROM Boards GROUP BY number, name ORDER BY id DESC");

const add = ({ name, board, number, is_win, is_perfect }: BoardSubmission) =>
    Query("INSERT INTO Boards SET ?", [{ name, board, number, is_win, is_perfect }]);

const getComments = () => Query("SELECT * FROM Comments");
const addComment = ({ day, name, text }: ICommentSubmission) =>
    Query("INSERT INTO Comments SET ?", [{ day, name, text }]);

export default {
    getAll,
    add,
    comments: {
        getAll: getComments,
        add: addComment,
    },
};
