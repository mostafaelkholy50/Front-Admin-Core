import { queryOptions } from "@tanstack/react-query";
import { stateService } from "../services/state.service";
import type { DashboardState } from "../../types/api.types";

/**
 * Dashboard / State Query Options Factory
 */
export const stateQueries = {
    dashboard: () =>
        queryOptions<DashboardState>({
            queryKey: ["dashboard", "state"],
            queryFn: stateService.getDashboard,
            staleTime: 1000 * 60 * 2,
            gcTime: 1000 * 60 * 5,
        }),
};
