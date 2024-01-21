const DARK_MODE_KEY = "darkMode";
const NAME_KEY = "name";

const getName = () => {
    const lsName = localStorage.getItem(NAME_KEY);
    return lsName;
};

const setName = (name: string) => {
    localStorage.setItem(NAME_KEY, name);
};

const getDarkMode = () => {
    const darkMode = localStorage.getItem(DARK_MODE_KEY) || "false";
    return JSON.parse(darkMode);
};

const setDarkMode = (mode: boolean) => {
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(mode));
};

export default {
    name: {
        get: getName,
        set: setName,
    },
    darkMode: {
        get: getDarkMode,
        set: setDarkMode,
    },
};
