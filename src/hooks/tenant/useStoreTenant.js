import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tenantService } from "../../api/services/tenant.service.js";
import { tenantQueries } from "../../api/queries/tenant.queries.js";
import toast from "react-hot-toast";

/**
 * Like RTK Query's auto-generated `useStoreTenantMutation`.
 * Handles cache invalidation and user feedback centrally.
 */
export const useStoreTenant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: tenantService.create,

        onSuccess: () => {
            // Invalidate using the query key from the factory — single source of truth
            queryClient.invalidateQueries({ queryKey: tenantQueries.all().queryKey });
            toast.success("تم إنشاء المستأجر بنجاح!");
        },

        onError: (error) => {
            const msg = error?.response?.data?.message || "فشل في إنشاء المستأجر";
            toast.error(msg);
        },
    });
};
