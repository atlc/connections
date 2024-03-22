const DARK_MODE_KEY = "darkMode";
const NAME_KEY = "name";
const TOKEN_KEY = "token";

const darkMode = {
    get: () => {
        const darkMode = localStorage.getItem(DARK_MODE_KEY) || "false";
        return JSON.parse(darkMode);
    },
    set: (mode: boolean) => {
        localStorage.setItem(DARK_MODE_KEY, JSON.stringify(mode));
    },
};

const name = {
    get: () => {
        const lsName = localStorage.getItem(NAME_KEY);
        return lsName;
    },
    set: (name: string) => {
        localStorage.setItem(NAME_KEY, name);
    },
};

const token = {
    get: () => {
        const token = localStorage.getItem(TOKEN_KEY);
        return token;
    },
    set: (token: string) => {
        localStorage.setItem(TOKEN_KEY, token);
    },
};

export default {
    darkMode,
    name,
    token,
};
