import Swal from "sweetalert2";
import { loadComments } from "./loadBoards";

export async function addComment({ comment, name, day }: { comment: string; name: string; day: string }) {
    if (!comment || !name || !day) return;

    const URL_PREFACE = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

    try {
        const res = await fetch(`${URL_PREFACE}/api/boards/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                day,
                text: comment,
            }),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        await loadComments();
    } catch (error) {
        Swal.fire({
            title: "Oh no :(",
            text: (error as Error).message,
            icon: "error",
            timer: 10000,
            toast: true,
            position: "top-right",
        });
        throw new Error((error as Error).message);
    }
}
