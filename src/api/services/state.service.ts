import { api } from "../axios";
import type { DashboardState } from "../../types/api.types";

/**
 * State/Dashboard Service — pure typed HTTP functions, no React.
 */
export const stateService = {
    getDashboard: async (): Promise<DashboardState> => {
        const { data } = await api.get<DashboardState>("/state");
        return data;
    },
};
