import { Query } from "../connection";

export interface ICommentSubmission {
    name: string;
    day: string;
    text: string;
}

const add = ({ day, name, text }: ICommentSubmission) => Query("INSERT INTO Comments SET ?", [{ day, name, text }]);

const deleteComment = (id: number) => Query("DELETE FROM Comments WHERE id=?", [id]);

const getAll = () => Query("SELECT * FROM Comments");

export default {
    add,
    all: getAll,
    delete: deleteComment,
};
