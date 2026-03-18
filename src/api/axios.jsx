import axios from "axios";

function getBaseURL() {
    const host = window.location.host;
    const isLocal = host.includes("localhost") || host.includes("127.0.0.1") || host.includes("core.test");

    if (isLocal) {
        return "http://core.test/api";
    }

    const parts = host.split(".");
    if (parts.length <= 2) {
        return `https://${host}/api`;
    }

    const subdomain = parts[0];
    const rest = parts.slice(1).join(".");
    return `https://${subdomain}.${rest}/api`;
}

export const api = axios.create({
    baseURL: getBaseURL(),
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});