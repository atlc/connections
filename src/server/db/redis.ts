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
    const boards = (await client.get(BOARDS_KEY)) || "";
    console.log({ message: "getting boards from cache", boards });
    await client.disconnect();
    return JSON.parse(boards);
}

export default {
    boards: {
        get: getBoardsCache,
        set: setBoardsCache,
    },
};
