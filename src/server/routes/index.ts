import express from "express";
import Boards from "../db";
import { hasGoodBoard, errorHandler } from "../controllers";
import Redis from "../db/redis";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const boards = await Redis.boards.get();

        if (!boards) {
            const mysqlBoards = await Boards.getAll();
            await Redis.boards.set(mysqlBoards);
            res.json(mysqlBoards);
        } else {
            res.json(boards);
        }
    } catch (error) {
        next(error);
    }
});

router.post("/", hasGoodBoard, async (req, res, next) => {
    const entry = { ...req.body };

    try {
        await Boards.add(entry);
        const boards = await Boards.getAll();
        await Redis.boards.set(boards);

        res.status(201).json({ message: "Added!" });
    } catch (error) {
        next(error);
    }
});

router.use(errorHandler);

export default router;
