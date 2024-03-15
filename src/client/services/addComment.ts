import { loadComments } from "./loadBoards";
import { POST } from "./apiService";
import Alerts from "./Alerts";

export async function addComment({ comment, name, day }: { comment: string; name: string; day: string }) {
    if (!comment || !name || !day) return;

    const URL_PREFACE = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

    try {
        await POST("/api/boards/comments", { name, day, text: comment });
        await loadComments();
    } catch (error) {
        Alerts.error(error as Error);
        throw new Error((error as Error).message);
    }
}
