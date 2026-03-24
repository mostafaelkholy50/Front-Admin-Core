import { api } from "../axios";
import type { LoginPayload, LoginResponse } from "../../types/api.types";

/**
 * Auth Service — pure typed HTTP functions, no React.
 */
export const authService = {
    login: async (payload: LoginPayload): Promise<LoginResponse> => {
        const { data } = await api.post<LoginResponse>("/login", payload);
        return data;
    },

    logout: async (): Promise<void> => {
        await api.post("/logout");
    },
};
