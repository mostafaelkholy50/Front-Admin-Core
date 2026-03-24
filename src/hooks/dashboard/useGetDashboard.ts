import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { stateQueries } from "../../api/queries/state.queries";
import type { DashboardState } from "../../types/api.types";

/**
 * Typed hook for fetching dashboard state.
 */
export const useGetDashboard = (
    options?: Partial<UseQueryOptions<DashboardState>>
) => {
    return useQuery<DashboardState>({
        ...stateQueries.dashboard(),
        ...options,
    });
};
