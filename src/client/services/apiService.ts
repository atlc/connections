import Alerts from "./Alerts";
import LocalStorage from "./LocalStorage";

type ValidMethods = "GET" | "POST" | "PUT" | "DELETE";

async function fetcher<T = any>(url: string, method: ValidMethods = "GET", rawData?: unknown, hideError: boolean = false) {
    const headers: HeadersInit = {};

    const options: RequestInit = {
        method,
        headers,
    };

    const token = LocalStorage.token.get();
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

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
                if (!hideError) {
                    Alerts.error(new Error(data.message));
                }
            }
        } catch (error) {
            console.error(error);
            if (!hideError) {
                Alerts.error(error as Error);
            }
        }
    });
}

export const GET = <T = any>(url: string, hideError?: boolean) => fetcher<T>(url, "GET", null, hideError);

export const POST = <T = any>(url: string, data: unknown, hideError?: boolean) => fetcher<T>(url, "POST", data, hideError);

export const PUT = <T = any>(url: string, data: unknown, hideError?: boolean) => fetcher<T>(url, "PUT", data, hideError);

export const DELETE = <T = any>(url: string, hideError?: boolean) => fetcher<T>(url, "DELETE", null, hideError);
