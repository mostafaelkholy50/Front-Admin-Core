import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";

export const useGetTenants = () => {
    return useQuery({
        queryKey: ["tenants"],
        queryFn: async () => {
            const { data } = await api.get("/tenants");
            const tenantsList = data.tenants || [];

            localStorage.setItem("tenants", JSON.stringify(tenantsList));

            return tenantsList;
        },
        staleTime: 1000 * 60 * 5,
    });
};

export const useStoreTenant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, name, domain }) =>
            api.post("/tenants", { id, name, domain }).then((res) => res.data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tenants"] });
            console.log("Tenant created → list refreshed");
        },

        onError: (error) => {
            console.error("Failed to create tenant:", error);
        },
    });
};