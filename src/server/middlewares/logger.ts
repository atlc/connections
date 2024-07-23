import { RequestHandler } from "express";
import db from "../db";

export const metricLogger: RequestHandler = async (req, res, next) => {
    const ip = req.ip || "";
    const { name, number } = req.body;

    db.metrics.add({ ip, name, number }).catch(console.log);
    next();
};
