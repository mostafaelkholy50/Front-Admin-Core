import { queryOptions } from "@tanstack/react-query";
import { tenantService } from "../services/tenant.service";
import type { Tenant } from "../../types/api.types";

/**
 * Tenant Query Options Factory — typed equivalent of RTK Query's injectEndpoints.
 *
 * Each exported key mirrors a builder.query entry:
 *   tenantQueries.all()  →  builder.query({ providesTags: ["Tenants"] })
 *
 * Benefits:
 *  - queryKey is the single source of truth (used in invalidateQueries too)
 *  - queryFn is fully typed (returns Tenant[])
 *  - staleTime/gcTime configured once, used everywhere
 */
export const tenantQueries = {
    all: () =>
        queryOptions<Tenant[]>({
            queryKey: ["tenants"],
            queryFn: tenantService.getAll,
            staleTime: 1000 * 60 * 5, // 5 min — won't refetch if data is fresh
            gcTime: 1000 * 60 * 10,   // 10 min — kept in persisted cache
        }),
};
