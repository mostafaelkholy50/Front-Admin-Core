import { api } from "../axios";
import type { Tenant, CreateTenantPayload } from "../../types/api.types";

/**
 * Tenant Service — pure typed HTTP functions, no React.
 */
export const tenantService = {
    getAll: async (): Promise<Tenant[]> => {
        const { data } = await api.get<{ tenants: Tenant[] }>("/tenants");
        return data.tenants ?? [];
    },

    create: async (payload: CreateTenantPayload): Promise<void> => {
        await api.post("/tenants", payload);
    },
};
