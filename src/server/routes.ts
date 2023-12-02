import express from "express";
import Boards, { BoardSubmission } from "./db";
import { hasGoodBoard, errorer } from "./controllers";

const router = express.Router();

router.get("/", (req, res, next) => {
    Boards.getAll()
        .then((data) => res.json(data))
        .catch(next);
});

router.post("/", hasGoodBoard, (req, res, next) => {
    const entry = { ...req.body } as BoardSubmission;

    Boards.add(entry)
        .then(() => res.status(201).json({ message: "Added!" }))
        .catch(next);
});

router.use(errorer);

export default router;
