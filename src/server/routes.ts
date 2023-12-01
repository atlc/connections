import express, { ErrorRequestHandler } from "express";
import Boards, { BoardSubmission } from "./db";
import { hasGoodBoard } from "./controllers";

const router = express.Router();

router.get("/", (req, res, next) => {
    Boards.getAll().then(res.json).catch(next);
});

router.post("/", hasGoodBoard, (req, res, next) => {
    const entry = { ...req.body } as BoardSubmission;

    Boards.add(entry)
        .then(() => res.status(201).json({ message: "Added!" }))
        .catch(next);
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err);
    const message = err.sqlMessage || err.message;
    res.status(500).json({ message: `Can't add or get boards :( (give error code of "${message}" to Andrew)` });
};

router.use(errorHandler);

export default router;
