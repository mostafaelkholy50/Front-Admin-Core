import { useQuery } from "@tanstack/react-query";
import { stateQueries } from "../../api/queries/state.queries.js";

/**
 * Hook for fetching dashboard state.
 * Thin wrapper — all config lives in stateQueries.dashboard().
 */
export const useGetDashboard = (options = {}) => {
    return useQuery({
        ...stateQueries.dashboard(),
        ...options,
    });
};
