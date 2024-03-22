import express from "express";
import db from "../db";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const comments = await db.comments.all();
        res.json(comments);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    const { day, name, text } = req.body;

    if (text.length > 512) return res.status(400).json({ message: "Comment cannot exceed 512 characters" });

    try {
        await db.comments.add({ day, name, text });
        res.status(201).json({ message: "Added!" });
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (!id) return res.status(400).json({ message: "Invalid comment ID" });

    try {
        await db.comments.delete(id);
        res.status(201).json({ message: "Nuked!" });
    } catch (error) {
        next(error);
    }
});

export default router;
