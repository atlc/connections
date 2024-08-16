import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type DateFormat = {
    "mM/dD": `${number | ""}${number}/${number | ""}${number}`;
    "YYYY-MM-DD": `${number}${number}${number}${number}-${number}${number}-${number}${number}`;
};

interface IEntry {
    date: DateFormat["YYYY-MM-DD"];
    notes: {
        text: string;
        shouldHighlight?: boolean;
    }[];
}

const entries: IEntry[] = [
    {
        date: "2024-08-16",
        notes: [
            { text: "Added in People's Champ leaderboard item and trophy emoji for users who were the sole perfectionist of the day" },
            { text: "Added a tally of total submissions beneath the Leaderboard header" },
        ],
    },
    {
        date: "2024-07-23",
        notes: [
            { text: "Created new daily text to celebrate those who are the sole person to have a perfect board", shouldHighlight: true },
            { text: "Updated timestamping to occur client-side to account for playing in non-central timezones" },
        ],
    },
    {
        date: "2024-03-15",
        notes: [
            {
                text: "Everyone now has the ability to delete their comments!",
                shouldHighlight: true,
            },
            {
                text: "Small bit of code cleanup consisting of making a reusable API service to greatly reduce the amount of fetch code being written and making an alert service wrapping around the Sweetalert success/error calls. Overall a net negative in code which is greatly needed in this project lol.",
            },
        ],
    },
    {
        date: "2024-01-31",
        notes: [
            { text: "Upped the comment length from 256 to 512 characters" },
            {
                text: "Mostly wrapped up code to inject functionality into the Connections website itself with a Firefox/Chrome extension which will let a user pull their board history back to see a play-by-play replay, and also get an accurate time score potentially. This means if one starts playing at 3 AM and finished at 3:10 AM, their score could be recorded as 10 minutes of playtime instead of measuring the submission time of 190 minutes.",
            },
        ],
    },
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

const last_update = entries[0].date;
let [yyyy, mm, dd] = last_update.split("-").map((strnum) => parseInt(strnum));
const LAST_UPDATE_FORMATTED: DateFormat["mM/dD"] = `${mm}/${dd}`;

const Changelog = () => {
    const [collapsed, setCollapsed] = useState(true);
    const isDark = useSelector((state: RootState) => state.inputs.darkMode);

    const formatDate = (date: Date) => {
        const offsetDate = date;
        offsetDate.setDate(date.getDate() + 1);
        const [dayName, monthAbbv, monthDay, yearDay] = offsetDate.toDateString().split(" ");
        return `${monthAbbv} ${monthDay}, ${yearDay} (${dayName})`;
    };

    return (
        <div
            className="row justify-content-center overflow-scroll border border-secondary border-1 rounded-3 p-1 mx-1"
            style={{ maxHeight: "33vh" }}
        >
            <h1
                className={`text-${isDark ? "secondary" : "dark"}`}
                onClick={() => setCollapsed(!collapsed)}
            >
                Changelog ({LAST_UPDATE_FORMATTED}) <span className="btn btn-secondary">{collapsed ? "show" : "hide"} updates</span>
            </h1>
            {!collapsed &&
                entries
                    .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
                    .map((entry) => (
                        <div
                            key={`changelog-div-${entry.date}`}
                            className="col-12"
                        >
                            <h2
                                className={`text-${isDark ? "secondary" : "dark"}`}
                                onClick={() => setCollapsed(!collapsed)}
                            >
                                {formatDate(new Date(entry.date))}
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
