import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { MESSAGES } from "../constants/messages";

/**
 * Single Axios instance shared across the entire app.
 * Base URL is pulled from .env — never hardcoded.
 */
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL as string,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        const status = error.response?.status;

        if (status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            if (!window.location.pathname.includes("/login")) {
                window.location.href = "/login";
            }
        } else if (status !== undefined && status >= 500) {
            toast.error(MESSAGES.errors.serverError);
        }

        return Promise.reject(error);
    }
);
