import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { tenantQueries } from "../../api/queries/tenant.queries";
import type { Tenant } from "../../types/api.types";

/**
 * Typed hook — equivalent of RTK Query's auto-generated `useGetTenantsQuery`.
 * All config lives in tenantQueries.all(); this is a thin typed wrapper.
 */
export const useGetTenants = (
    options?: Partial<UseQueryOptions<Tenant[]>>
) => {
    return useQuery<Tenant[]>({
        ...tenantQueries.all(),
        ...options,
    });
};
