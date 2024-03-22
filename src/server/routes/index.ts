import express from "express";
import { errorHandler } from "../controllers";
import boardsRouter from "./boards";
import commentsRouter from "./comments";

const router = express.Router();

router.use("/boards", boardsRouter);
router.use("/comments", commentsRouter);

router.use(errorHandler);

export default router;
