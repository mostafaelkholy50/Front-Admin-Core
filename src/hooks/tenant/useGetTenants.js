import { useQuery } from "@tanstack/react-query";
import { tenantQueries } from "../../api/queries/tenant.queries.js";

/**
 * Like RTK Query's auto-generated `useGetTenantsQuery`.
 * Thin wrapper — all config lives in tenantQueries.all().
 *
 * @param {object} options  - Any extra useQuery options to override defaults
 */
export const useGetTenants = (options = {}) => {
    return useQuery({
        ...tenantQueries.all(),
        ...options,
    });
};
