import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Leaderboard from "./components/Leaderboard";
import Boards from "./components/Boards";
import { sanitize } from "./utilities/parsers";

export interface IBoard {
    id: number;
    name: string;
    board: string;
    number: string;
    created_at: Date;
    is_perfect: boolean;
}

export interface ILeaderboard {
    [name: string]: {
        active: number;
        max: number;
        perfect: number;
    };
}

export interface DateSortedBoards {
    [puzzleNum: string]: IBoard[];
}

const App = () => {
    const [name, setName] = useState("");
    const [hadName, setHadName] = useState(false);
    const [changeName, setChangeName] = useState(false);
    const [boards, setBoards] = useState<DateSortedBoards>({});
    const [showAddBoard, setShowAddBoard] = useState(true);
    const [board, setBoard] = useState("");
    const [leaderBoard, setLeaderboard] = useState<ILeaderboard>({});

    function getNumber(boardString: string) {
        console.log({ boardString });

        return boardString.split(/Puzzle #/g)[1]!.match(/\d+/g)![0];
    }

    async function loadPastBoards() {
        try {
            const res = await fetch("/api/boards");
            const data = await res.json();

            if (!res.ok) throw new Error(data.message);

            const byDate: { [key: string]: IBoard[] } = {};
            (data as IBoard[]).forEach((b) => {
                if (!byDate[b.number]) {
                    byDate[b.number] = [b];
                } else {
                    byDate[b.number].push(b);
                }
            });

            const leaders: ILeaderboard = {};
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

                for (const player of dayPlayers) {
                    const isInLeaderboard = leaders[player];
                    const playedYesterday = isNotFirstDay && previousDayPlayers.includes(player);

                    if (!isInLeaderboard) {
                        console.log(`${player} did not exist in the leaderboard, and has been added with a score of 1`);
                        leaders[player] = {
                            active: 1,
                            max: 1,
                            perfect: 0,
                        };
                    } else {
                        if (!playedYesterday) {
                            console.log(`${player} did not play yesterday. Active streak has been reset to 1`);
                            leaders[player].active = 1;
                        } else {
                            console.log(`${player} did play yesterday. Previous score ${leaders[player]}`);
                            leaders[player].active += 1;

                            if (leaders[player].active >= leaders[player].max) {
                                leaders[player].max = leaders[player].active;
                            }

                            console.log(`${player} did play yesterday. Updated score ${leaders[player]}`);
                        }
                    }
                }

                console.log("------------------------------------\n");

                const dayBoard = byDate[day];
                dayBoard.forEach(({ name, is_perfect }) => {
                    if (is_perfect) {
                        leaders[name].perfect += 1;
                    }
                });
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
                    <div>
                        {!board && (
                            <button onClick={() => setShowAddBoard(!showAddBoard)} className="btn btn-secondary m-2">
                                {showAddBoard ? "Hide board input?" : "Show board input?"}
                            </button>
                        )}
                        {hadName && !changeName && (
                            <button onClick={() => setChangeName(true)} className="btn btn-secondary m-2">
                                Change name? ({name})
                            </button>
                        )}
                    </div>
                    <h1>{!hadName && "Whose board is this?"}</h1>
                    {(!hadName || changeName) && (
                        <>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Ken Jennings"
                                className="form-control"
                            />
                            <button onClick={handleNameChange} className="btn btn-secondary mt-4">
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
                        {board && (
                            <button onClick={addBoard} className="btn btn-secondary">
                                Add board
                            </button>
                        )}
                    </div>
                )}
            </div>

            <Leaderboard leaderBoard={leaderBoard} />
            <Boards boards={boards} />
        </div>
    );
};

export default App;
