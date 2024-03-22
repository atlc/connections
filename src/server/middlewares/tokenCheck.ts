import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const tokenCheck: RequestHandler = (req, res, next) => {
    const { ip, method, originalUrl } = req;

    let type = "";
    let token = "";
    let status = false;
    let info: {} | Error | unknown = {};

    const authHeader = req.headers?.authorization;

    if (authHeader) {
        [type, token] = authHeader.split(" ");
    }

    try {
        const verified = jwt.verify(token, config.jwt.secret);
        status = true;
        info = verified;
    } catch (error) {
        status = false;
        info = error;
    }

    const elements = { ip, method, url: originalUrl, type, token, status, info };
    console.log(elements);
    next();
};

export default tokenCheck;
