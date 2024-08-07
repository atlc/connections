import { sanitize, getNumber } from "../utilities/parsers";
import { loadPastBoards } from "./loadBoards";
import { POST } from "./apiService";
import Alerts from "./Alerts";

export async function addBoard({ board, name, created_at }: { board: string; name: string; created_at: string }) {
    if (!board || !name) return;

    try {
        await POST("/api/boards", { name, board: sanitize(board), number: getNumber(board), created_at });
        await loadPastBoards();
    } catch (error) {
        Alerts.error(error as Error);
        throw new Error((error as Error).message);
    }
}
