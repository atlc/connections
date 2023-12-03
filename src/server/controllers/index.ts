import type { RequestHandler, ErrorRequestHandler } from "express";

export const hasGoodBoard: RequestHandler = (req, res, next) => {
    const { name, board, number } = req.body;

    if (!name || !board || !number) {
        return res.status(400).json({ message: `Make sure both name and the board are provided!` });
    }

    if (typeof name !== "string" || typeof board !== "string" || typeof number !== "string") {
        return res.status(400).json({ message: `Type mismatch - name, board, or number are not strings` });
    }

    const rows: string[] = board.split("\n");
    const homogeneous_rows = rows.filter((row) => [...row].every((char) => char === row[0])).length;

    const is_win = homogeneous_rows === 4;
    const is_perfect = rows.length === 4 && is_win;

    req.body = {
        name,
        board,
        number,
        is_perfect,
        is_win,
    };

    next();
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    const message = err.sqlMessage || err.message;
    res.status(500).json({ message: `Can't add or get boards :( (give error code of "${message}" to Andrew)` });
};
