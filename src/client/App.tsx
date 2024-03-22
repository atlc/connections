import React, { useEffect } from "react";
import Leaderboard from "./components/Leaderboard";
import Boards from "./components/Boards";
import Inputs from "./components/Inputs";
import Changelog from "./components/Changelog";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import LocalStorage from "./services/LocalStorage";
import { GET } from "./services/apiService";

const App = () => {
    const isDark = useSelector((state: RootState) => state.inputs.darkMode);

    useEffect(() => {
        const token = LocalStorage.token.get();

        if (!token) {
            GET("/auth/request", true).then((results) => {
                if (results?.token) {
                    LocalStorage.token.set(results.token);
                }
            });
        }

        document.body.classList.remove(isDark ? "bg-dark-subtle" : "bg-dark");
        document.body.classList.add(isDark ? "bg-dark" : "bg-dark-subtle");
    }, [isDark]);

    return (
        <div className="container">
            <Inputs />
            <Leaderboard />
            <Changelog />
            <Boards />
        </div>
    );
};

export default App;
