import { IBoard } from "../types";

export const sanitize = (boardString: string) => {
    return boardString
        .replace(/\w+\s+/g, "")
        .replace("#", "")
        .replace(/🟪/g, "P")
        .replace(/🟦/g, "B")
        .replace(/🟩/g, "G")
        .replace(/🟨/g, "Y");
};

export const unsanitize = (sanitizedBoard: string) => {
    return sanitizedBoard.replace(/P/g, "🟪").replace(/B/g, "🟦").replace(/G/g, "🟩").replace(/Y/g, "🟨");
};

export const secondsToFormattedHHMMSS = (secondsRaw: number) => {
    const seconds = Math.floor(secondsRaw % 60);
    const minuteOverflow = Math.floor(secondsRaw / 60);

    const minutes = Math.floor(minuteOverflow % 60);
    const hourOverflow = Math.floor(minuteOverflow / 60);

    const hours = hourOverflow;

    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    const formatted = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    return formatted;
};

export const getNumber = (boardString: string) => {
    return boardString.split(/Puzzle #/g)[1]!.match(/\d+/g)![0];
};

export const getDateAttributes = (boards: IBoard[]) => {
    return boards.map((b, i) => {
        const board = { ...b };
        const first_timestamp_day = 172;
        const parsedDay = parseInt(board["number"]);

        if (parsedDay && parsedDay > first_timestamp_day) {
            const dayBoards = boards.filter((b) => parseInt(b.number) === parsedDay);
            const is_production = process.env.NODE_ENV === "production";

            const utc_offset = is_production ? 0 : -6;
            const date = new Date(board["created_at"]);
            date.setHours(date.getHours() + utc_offset);

            const timestamp = date.toLocaleTimeString();
            const [time, meridiem] = timestamp.split(" ") as [string, "AM" | "PM"];
            const [hh, mm, ss] = time.split(":");

            const parsedHours = parseInt(hh);
            const is_midnight = parsedHours === 12 && meridiem === "AM";
            const is_after_noon = meridiem === "PM";
            const hours = is_midnight ? 0 : is_after_noon ? parsedHours + 12 : parsedHours;

            board.is_gunslinger = dayBoards.reverse()[0].id === b.id;
            board.timestamp = timestamp;
            board.time_delta = `${hours}:${mm}:${ss}`;
        }

        return board;
    });
};

export const getTimeAverage = (formattedTimes: string[]) => {
    const time = [0, 0, 0];
    for (const timeStr of formattedTimes) {
        const [hh, mm, ss] = timeStr.split(":");
        time[0] += parseInt(hh);
        time[1] += parseInt(mm);
        time[2] += parseInt(ss);
    }

    const [hh, mm, ss] = time;
    const flattenedSeconds = hh * 3600 + mm * 60 + ss;
    const averageSeconds = Math.floor(flattenedSeconds / formattedTimes.length);
    const formatted = secondsToFormattedHHMMSS(averageSeconds);

    return {
        seconds: averageSeconds,
        formatted,
    };
};

export const getBestTime = (formattedTimes: string[]) => {
    let bestTime = 0;

    for (const timeStr of formattedTimes) {
        const [hh, mm, ss] = timeStr.split(":");
        const hoursToSecondsParsed = parseInt(hh) * 60 * 60;
        const minutesToSecondsParsed = parseInt(mm) * 60;
        const secondsParsed = parseInt(ss);

        const seconds = secondsParsed + minutesToSecondsParsed + hoursToSecondsParsed;

        if (!bestTime) bestTime = seconds;
        if (seconds < bestTime) bestTime = seconds;
    }

    const formatted = secondsToFormattedHHMMSS(bestTime);
    const seconds = bestTime;

    return { formatted, seconds };
};
