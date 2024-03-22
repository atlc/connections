import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const requisitionToken: RequestHandler = (req, res, next) => {
    const { ip } = req;

    const token = jwt.sign({}, config.jwt.secret, { expiresIn: "1y" });

    console.log(`Requisitioning a token for ${ip}\n${token}`);

    res.json({ token });
};

export default requisitionToken;
