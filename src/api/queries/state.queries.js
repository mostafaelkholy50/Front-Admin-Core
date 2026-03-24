import { queryOptions } from "@tanstack/react-query";
import { stateService } from "../services/state.service.js";

/**
 * Dashboard / State Query Options Factory
 */
export const stateQueries = {
    dashboard: () =>
        queryOptions({
            queryKey: ["dashboard", "state"],
            queryFn: stateService.getDashboard,
            staleTime: 1000 * 60 * 2, // 2 minutes
            gcTime: 1000 * 60 * 5,
        }),
};
