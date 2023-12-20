import express from "express";
import Boards from "../db";
import { hasGoodBoard, errorHandler } from "../controllers";
import Redis from "../db/redis";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const is_production = process.env.NODE_ENV === "production";

        // If we're in production, pull board from the Redis cache
        let boards = is_production ? await Redis.boards.get() : await Boards.getAll();

        // If we're in production and the cache has not been loaded yet (IE after a new deploy),
        // fallback to pulling from MySQL and hydrate the Redis cache
        if (is_production && !boards) {
            boards = await Boards.getAll();
            await Redis.boards.set(boards);
        }

        res.json(boards);
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
