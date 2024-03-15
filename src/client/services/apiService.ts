import Alerts from "./Alerts";

type ValidMethods = "GET" | "POST" | "PUT" | "DELETE";

export const TOKEN_KEY = "token";

async function fetcher<T = any>(url: string, method: ValidMethods = "GET", rawData?: unknown) {
    const headers: HeadersInit = {};

    const options: RequestInit = {
        method,
        headers,
    };

    if (method === "POST" || method === "PUT") {
        headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(rawData);
    }

    return new Promise<T>(async (resolve) => {
        try {
            const res = await fetch(process.env.SERVER_URL + url, options);
            const data = await res.json();

            if (res.ok) {
                resolve(data);
            } else {
                console.error(data);
                Alerts.error(new Error(data.message));
            }
        } catch (error) {
            console.error(error);
            Alerts.error(error as Error);
        }
    });
}

export const GET = <T = any>(url: string) => fetcher<T>(url);

export const POST = <T = any>(url: string, data: unknown) => fetcher<T>(url, "POST", data);

export const PUT = <T = any>(url: string, data: unknown) => fetcher<T>(url, "PUT", data);

export const DELETE = <T = any>(url: string) => fetcher<T>(url, "DELETE");
