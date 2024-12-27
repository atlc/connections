import React, { useEffect, useRef, useState } from "react";
import DaySet from "./DaySet";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

/**
 *
 * @returns In reverse chronological order, all boards and submissions for all days
 */
const Boards = () => {
    const boards = useSelector((state: RootState) => state.boards.boards);
    const boardKeys = Object.keys(boards);
    const ONE_WEEK = 7;
    const CHUNK_SIZE = Math.ceil(boardKeys.length / 10);

    const [displayableBoards, setDisplayableBoards] = useState(ONE_WEEK);
    const [hasLoaded, setHasLoaded] = useState(false); // Just to prevent initial render's ref scrolling

    useEffect(() => {
        setHasLoaded(true);
    }, []);

    useEffect(() => {
        if (!hasLoaded) return;

        if (displayableBoards === 7) {
            console.log("Should be scrolling up to element total #" + displayableBoards);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }, 10);
        } else {
            console.log("Should be scrolling down to element total #" + displayableBoards);
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }
    }, [displayableBoards]);

    return (
        <div>
            {boardKeys
                .reverse()
                .slice(0, displayableBoards)
                .map((day) => (
                    <DaySet day={day} key={`puzzle-row-${day}`} />
                ))}
            <div>
                {displayableBoards !== boardKeys.length && (
                    <>
                        <button onClick={() => setDisplayableBoards(displayableBoards + CHUNK_SIZE)} className="btn btn-secondary mx-2">
                            Display next 10% ({CHUNK_SIZE} days)
                        </button>
                        <button onClick={() => setDisplayableBoards(boardKeys.length)} className="btn btn-secondary mx-2">
                            Display all
                        </button>
                    </>
                )}
                {displayableBoards !== ONE_WEEK && (
                    <button onClick={() => setDisplayableBoards(ONE_WEEK)} className="btn btn-secondary mx-2">
                        Show just this week
                    </button>
                )}
            </div>
        </div>
    );
};

export default Boards;
