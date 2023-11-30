import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface Board {
    id: number;
    name: string;
    board: string;
    number: string;
}

interface Leaderboard {
    [name: string]: number;
}

interface DateSortedBoards {
    [puzzleNum: string]: Board[];
}

const App = () => {
    const [name, setName] = useState("");
    const [hadName, setHadName] = useState(false);
    const [changeName, setChangeName] = useState(false);
    const [boards, setBoards] = useState<DateSortedBoards>({});
    const [showAddBoard, setShowAddBoard] = useState(true);
    const [board, setBoard] = useState("");
    const [leaderBoard, setLeaderboard] = useState<Leaderboard>({});

    function sanitize(boardString: string) {
        return boardString
            .replace(/\w+\s+/g, "")
            .replace("#", "")
            .replace(/🟪/g, "P")
            .replace(/🟦/g, "B")
            .replace(/🟩/g, "G")
            .replace(/🟨/g, "Y");
    }

    function unsanitize(sanitizedBoard: string) {
        return sanitizedBoard.replace(/P/g, "🟪").replace(/B/g, "🟦").replace(/G/g, "🟩").replace(/Y/g, "🟨");
    }

    function getNumber(boardString: string) {
        console.log({ boardString });

        return boardString.split(/Puzzle #/g)[1]!.match(/\d+/g)![0];
    }

    async function loadPastBoards() {
        try {
            const res = await fetch("/api/boards");
            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            const byDate: { [key: string]: Board[] } = {};
            (data as Board[]).forEach((b) => {
                if (!byDate[b.number]) {
                    byDate[b.number] = [b];
                } else {
                    byDate[b.number].push(b);
                }
            });

            const leaders: Leaderboard = {};
            const days = Object.keys(byDate).reverse();

            days.forEach((day, i) => {
                const isNotFirstDay = i > 0;
                const dayPlayers = [...new Set(byDate[day].map((dayPlayer) => dayPlayer.name))];
                const previousDayPlayers = isNotFirstDay
                    ? [...new Set(byDate[days[i - 1]].map((dayPlayer) => dayPlayer.name))]
                    : [];

                console.log("------------------------------------");
                console.log(`The day is ${day}, and the following players have played today so far:`);
                console.log(dayPlayers);
                console.log(`The following players played yesterday:`);
                console.log(previousDayPlayers);
                console.log(`The leaderboard standings AFTER updating player scores for ${day}:`);
                console.log({ ...leaders });

                for (const player of dayPlayers) {
                    const isInLeaderboard = leaders[player];
                    const playedYesterday = isNotFirstDay && previousDayPlayers.includes(player);

                    console.log(
                        `For day ${day}, ${player} ${
                            isInLeaderboard ? "exists" : "does not exist yet"
                        } in the leaderboard, and if ${player} exists, they ${
                            playedYesterday ? "did" : "did not"
                        } play yesterday.`
                    );

                    if (!isInLeaderboard) {
                        console.log(`${player} did not exist in the leaderboard, and has been added with a score of 1`);
                        leaders[player] = 1;
                    } else {
                        if (!playedYesterday) {
                            console.log(`${player} did not play yesterday. Active streak has been reset to 1`);
                            leaders[player] = 1;
                        } else {
                            console.log(`${player} did play yesterday. Previous score ${leaders[player]}`);
                            leaders[player] += 1;
                            console.log(`${player} did play yesterday. Updated score ${leaders[player]}`);
                        }
                    }
                }

                console.log(`The leaderboard standings AFTER updating player scores for ${day}:`);
                console.log({ ...leaders });
                console.log("------------------------------------\n");
            });

            setLeaderboard(leaders);
            setBoards(byDate);
        } catch (error) {
            Swal.fire({
                title: "Oh no :(",
                text: (error as Error).message,
                icon: "error",
                timer: 10000,
                toast: true,
                position: "top-right",
            });
        }
    }

    async function addBoard() {
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

            loadPastBoards();
            setShowAddBoard(false);
            setBoard("");
        } catch (error) {
            Swal.fire({
                title: "Oh no :(",
                text: (error as Error).message,
                icon: "error",
                timer: 10000,
                toast: true,
                position: "top-right",
            });
        }
    }

    function handleNameChange() {
        localStorage.setItem("name", name);
        setHadName(true);
        setChangeName(false);
    }

    useEffect(() => {
        const lsName = localStorage.getItem("name");
        if (lsName) {
            setName(lsName);
            setHadName(true);
        }

        loadPastBoards();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="mt-2 card bg-white p-2">
                    <h1>
                        {hadName && !changeName && (
                            <button onClick={() => setChangeName(true)} className="btn btn-success">
                                Change name? (currently {name})
                            </button>
                        )}
                        {!hadName && "Whose board is this?"}
                    </h1>
                    {(!hadName || changeName) && (
                        <>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Ken Jennings"
                                className="form-control"
                            />
                            <button onClick={handleNameChange} className="btn btn-success mt-4">
                                {hadName ? "Update name?" : "Set name"}
                            </button>
                        </>
                    )}
                </div>
                {name && hadName && (
                    <div className="card my-1">
                        {showAddBoard && (
                            <textarea
                                placeholder="Paste your board in here exactly as it comes from the NYT"
                                rows={6}
                                className="form-control"
                                value={board}
                                onChange={(e) => setBoard(e.target.value)}
                            />
                        )}
                        {!board && (
                            <button onClick={() => setShowAddBoard(!showAddBoard)} className="btn btn-success">
                                {showAddBoard ? "Hide the board input?" : "Show the board input?"}
                            </button>
                        )}
                        {board && (
                            <button onClick={addBoard} className="btn btn-success">
                                Add board
                            </button>
                        )}
                    </div>
                )}
            </div>
            <div className="row">
                <div className="col-12">
                    <h4 className="text-center">
                        Active streaks:
                        {Object.entries(leaderBoard).map(([name, score]) => (
                            <span className="mx-3">[ {name.trim()}: ]</span>
                        ))}
                    </h4>
                    <h4 className="text-center">
                        Perfect boards:
                        {Object.entries(leaderBoard).map(([name, score]) => (
                            <span className="mx-3">[ {name.trim()}: ]</span>
                        ))}
                    </h4>
                    <h4 className="text-center">
                        Best all-time streaks:
                        {Object.entries(leaderBoard).map(([name, score]) => (
                            <span className="mx-3">
                                [ {name.trim()}: {score} ]
                            </span>
                        ))}
                    </h4>
                </div>
            </div>
            {Object.keys(boards)
                .reverse()
                .map((key) => (
                    <div
                        key={`puzzle-row-${key}`}
                        className="my-5 rounded-3 p-2 bg-light-subtle row justify-content-center"
                    >
                        <h1 className="text-center">Puzzle #{key}</h1>
                        {boards[key].map((b) => (
                            <div key={`${b.name}-puzzle-card-${b.id}`} className="my-1 col-12 col-md-6 col-lg-4">
                                <div className="card shadow-lg">
                                    <h1 className="text-center text-muted">{b.name}</h1>
                                    <textarea className="form-control text-center" rows={8} readOnly>
                                        {unsanitize(b.board)}
                                    </textarea>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    );
};

export default App;
