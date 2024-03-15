import express from "express";
import Boards from "../db";
import { hasGoodBoard, errorHandler } from "../controllers";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const boards = await Boards.getAll();
        res.json(boards);
    } catch (error) {
        next(error);
    }
});

router.post("/", hasGoodBoard, async (req, res, next) => {
    const entry = { ...req.body };

    try {
        await Boards.add(entry);
        res.status(201).json({ message: "Added!" });
    } catch (error) {
        next(error);
    }
});

router.get("/comments", async (req, res, next) => {
    try {
        const comments = await Boards.comments.getAll();
        res.json(comments);
    } catch (error) {
        next(error);
    }
});

router.post("/comments", async (req, res, next) => {
    const { day, name, text } = req.body;

    if (text.length > 512) return res.status(400).json({ message: "Comment cannot exceed 512 characters" });

    try {
        await Boards.comments.add({ day, name, text });
        res.status(201).json({ message: "Added!" });
    } catch (error) {
        next(error);
    }
});

router.delete("/comments/:id", async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (!id) return res.status(400).json({ message: "Invalid comment ID" });

    try {
        await Boards.comments.delete(id);
        res.status(201).json({ message: "Nuked!" });
    } catch (error) {
        next(error);
    }
});

router.use(errorHandler);

export default router;
