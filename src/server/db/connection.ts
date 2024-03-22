import mysql from "mysql2/promise";
import config from "../config";

const pool = mysql.createPool(config.mysql.db_url);

export const Query = async <T = mysql.ResultSetHeader>(sql: string, vals: unknown[] = []) => {
    const [rows] = await pool.query(sql, vals);
    return rows as T;
};
