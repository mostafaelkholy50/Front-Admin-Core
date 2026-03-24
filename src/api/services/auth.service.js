import { api } from "../axios.jsx";

/**
 * Auth Service — pure HTTP functions, no React.
 * Think of this like the `query:` property inside RTK Query's injectEndpoints.
 */
export const authService = {
    login: async ({ email, password }) => {
        const { data } = await api.post("/login", { email, password });
        return data;
    },

    logout: async () => {
        await api.post("/logout");
    },
};
