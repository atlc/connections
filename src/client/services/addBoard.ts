import Swal from "sweetalert2";
import { sanitize, getNumber } from "../utilities/parsers";
import { loadPastBoards } from "./loadBoards";

export async function addBoard({ board, name }: { board: string; name: string }) {
    if (!board || !name) return;

    try {
        const res = await fetch("/api/boards", {
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

        const { leaders, byDate } = await loadPastBoards();

        return { leaders, byDate };
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
