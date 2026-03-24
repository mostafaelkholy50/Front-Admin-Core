import { api } from "../axios.jsx";

/**
 * State/Dashboard Service — pure HTTP functions, no React.
 */
export const stateService = {
    getDashboard: async () => {
        const { data } = await api.get("/state");
        return data;
    },
};
