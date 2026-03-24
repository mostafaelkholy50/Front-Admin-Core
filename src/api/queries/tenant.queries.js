import { queryOptions } from "@tanstack/react-query";
import { tenantService } from "../services/tenant.service.js";

/**
 * Tenant Query Options Factory
 *
 * This is React Query's equivalent of RTK Query's injectEndpoints.
 * Each entry here is like one `builder.query` or `builder.mutation` — it defines
 * the queryKey, queryFn, and default options in ONE central place.
 *
 * Hooks (useGetTenants etc.) are just thin wrappers that call these options.
 * That means:
 *  - queryClient.invalidateQueries({ queryKey: tenantQueries.all().queryKey }) works everywhere
 *  - queryClient.prefetchQuery(tenantQueries.all()) works in loaders
 *  - Types are inferred automatically
 */
export const tenantQueries = {
    /**
     * Like: builder.query({ providesTags: ["Tenants"] })
     */
    all: () =>
        queryOptions({
            queryKey: ["tenants"],
            queryFn: tenantService.getAll,
            staleTime: 1000 * 60 * 5, // 5 minutes — won't refetch if data is fresh
            gcTime: 1000 * 60 * 10,   // 10 minutes — kept in cache (and localStorage) for 10 min
        }),
};
