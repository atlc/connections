import express from "express";
import db from "../db";
import { hasGoodBoard, errorHandler } from "../controllers";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const boards = await db.boards.all();
        res.json(boards);
    } catch (error) {
        next(error);
    }
});

router.post("/", hasGoodBoard, async (req, res, next) => {
    const entry = { ...req.body };

    try {
        await db.boards.add(entry);
        res.status(201).json({ message: "Added!" });
    } catch (error) {
        next(error);
    }
});

export default router;
