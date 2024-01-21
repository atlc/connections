import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface IEntry {
    date: string;
    notes: {
        text: string;
        shouldHighlight?: boolean;
    }[];
}

const entries: IEntry[] = [
    {
        date: "2024-01-21",
        notes: [
            {
                text: "Feature: DARK MODE IS HERE! The button in the top by the name inputs will let you toggle between light & dark and it will save your preferences between visits. No more scorching of your retinas after midnight, for those of you who like to have bright phone screens!",
                shouldHighlight: true,
            },
        ],
    },
    {
        date: "2024-01-17",
        notes: [
            { text: `(Leaderboard update) Removed the standard deviation component` },
            {
                text: `(Leaderboard update) Rewrote Gunslinger calculations to only count if it was the first *correct* solution`,
                shouldHighlight: true,
            },
            {
                text: "(Leaderboard update) Changed the average time entry to be a median time calculation for a more accurate representation of submission times (with the average time presented alongside it)",
                shouldHighlight: true,
            },
        ],
    },
    {
        date: "2024-01-18",
        notes: [
            {
                text: "(Feature update) Finished implementing a comments feature - you can now leave as many comments as you want per puzzle in a text-message style chain. Beware of spoilers!",
                shouldHighlight: true,
            },
            {
                text: "(Leaderboard update) Added in a hard mode entry in the leaderboard which is counted as completing a perfect board in hardest -> easiest difficulties (Purple, then Blue, then Green, then Yellow). Your board will also get an extra emoji for this",
            },
            {
                text: "(Feature update) Added changelog feature to document the most recent changes in the app",
            },
        ],
    },
];

const Changelog = () => {
    const [collapsed, setCollapsed] = useState(true);
    const isDark = useSelector((state: RootState) => state.inputs.darkMode);

    return (
        <div
            className="row justify-content-center overflow-scroll border border-secondary border-1 rounded-3 p-1 mx-1"
            style={{ maxHeight: "33vh" }}
        >
            <h1 className={`text-${isDark ? "secondary" : "dark"}`} onClick={() => setCollapsed(!collapsed)}>
                Changelog (1/20) <span className="btn btn-secondary">{collapsed ? "show" : "hide"} updates</span>
            </h1>
            {!collapsed &&
                entries
                    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
                    .map((entry) => (
                        <div key={`changelog-div-${entry.date}`} className="col-12">
                            <h2
                                className={`text-${isDark ? "secondary" : "dark"}`}
                                onClick={() => setCollapsed(!collapsed)}
                            >
                                {new Date(entry.date).toDateString()}
                            </h2>
                            <ul
                                className={`text-${isDark ? "secondary" : "dark"}`}
                                onClick={() => setCollapsed(!collapsed)}
                            >
                                {entry.notes.map((ent, i) => (
                                    <li key={`changelog-entry-${entry.date}-${i}`}>
                                        <span className={ent.shouldHighlight ? "fw-bold" : ""}>{ent.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
        </div>
    );
};

export default Changelog;
