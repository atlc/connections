import dotenv from "dotenv";
dotenv.config();

const mysql = {
    db_url: process.env.DB_URL as string,
};

const jwt = {
    secret: process.env.JWT_SECRET as string,
};

const redis = {
    db_url: process.env.REDISCLOUD_URL as string,
};

interface ConfigObject {
    [key: string]: string | undefined;
}

const hasUndefinedValues = (configObject: ConfigObject) => {
    return Object.values(configObject).some((val) => typeof val === "undefined");
};

((all_envars) => {
    for (const key in all_envars) {
        const obj = all_envars[key as keyof typeof all_envars];
        if (hasUndefinedValues(obj)) {
            console.log(`\n\nMissing required ${key} config vars!\n\n`);
            process.exit(1);
        }
    }
})({
    jwt,
    mysql,
    redis,
});

export default {
    jwt,
    mysql,
    redis,
};
