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

export const getNumber = (boardString: string) => {
    console.log({ boardString });

    return boardString.split(/Puzzle #/g)[1]!.match(/\d+/g)![0];
};
