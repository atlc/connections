import Swal from "sweetalert2";
import { sanitize, getNumber } from "../utilities/parsers";
import { loadPastBoards } from "./loadBoards";

export async function addBoard({ board, name }: { board: string; name: string }) {
    if (!board || !name) return;

    const URL_PREFACE = process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

    try {
        const res = await fetch(`${URL_PREFACE}/api/boards`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                board: sanitize(board),
                number: getNumber(board),
            }),
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        await loadPastBoards();
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
