import { api } from "../axios.jsx";

/**
 * Tenant Service — pure HTTP functions, no React.
 * Think of this like the `query:` property inside RTK Query's injectEndpoints.
 */
export const tenantService = {
    getAll: async () => {
        const { data } = await api.get("/tenants");
        return data.tenants ?? [];
    },

    create: async ({ id, name, domain }) => {
        const { data } = await api.post("/tenants", { id, name, domain });
        return data;
    },
};
