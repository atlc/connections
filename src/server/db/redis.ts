import { createClient } from "redis";

const BOARDS_KEY = "boards";

const client = createClient({
    url: process.env.REDISCLOUD_URL,
}).on("error", (err) => console.log("Redis Client Error", err));

async function setBoardsCache(boards: any) {
    await client.connect();
    await client.set(BOARDS_KEY, JSON.stringify(boards));
    await client.disconnect();
}

async function getBoardsCache() {
    await client.connect();
    const boards = await client.get(BOARDS_KEY);
    await client.disconnect();
    return boards ? JSON.parse(boards) : null;
}

export default {
    boards: {
        get: getBoardsCache,
        set: setBoardsCache,
    },
};
