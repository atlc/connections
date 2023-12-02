import mysql from "mysql";

export interface BoardSubmission {
    name: string;
    board: string;
    number: string;
    is_win: boolean;
    is_perfect: boolean;
}

const pool = mysql.createPool(process.env.DB_URL!);

const Query = (sql: string, vals: unknown[] = []) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) return reject(err);

            connection.query(sql, vals, (err, data) => {
                connection.release();
                err ? reject(err) : resolve(data);
            });
        });
    });
};

const getAll = () => Query("SELECT * FROM Boards GROUP BY number, name ORDER BY id DESC");

const add = ({ name, board, number, is_win, is_perfect }: BoardSubmission) =>
    Query("INSERT INTO Boards SET ?", [{ name, board, number, is_win, is_perfect }]);

export default {
    getAll,
    add,
};
