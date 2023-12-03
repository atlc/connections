import { createClient } from "redis";

const BOARDS_KEY = "boards";

const client = await createClient({
    url: process.env.REDISCLOUD_URL,
})
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

async function setBoardsCache(boards: any) {
    await client.set(BOARDS_KEY, JSON.stringify(boards));
    await client.disconnect();
}

async function getBoardsCache() {
    const boards = (await client.get(BOARDS_KEY)) || "";
    await client.disconnect();
    return JSON.parse(boards);
}

export default {
    boards: {
        get: getBoardsCache,
        set: setBoardsCache,
    },
};
