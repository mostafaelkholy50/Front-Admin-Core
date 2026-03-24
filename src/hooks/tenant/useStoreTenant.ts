import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tenantService } from "../../api/services/tenant.service";
import { tenantQueries } from "../../api/queries/tenant.queries";
import { MESSAGES } from "../../constants/messages";
import toast from "react-hot-toast";
import type { CreateTenantPayload } from "../../types/api.types";
import type { AxiosError } from "axios";

interface ApiErrorResponse {
    message?: string;
}

/**
 * Typed mutation hook for creating tenants.
 * Uses query factory key for invalidation — queryKey never duplicated.
 * Uses MESSAGES for all user-facing strings.
 */
export const useStoreTenant = () => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError<ApiErrorResponse>, CreateTenantPayload>({
        mutationFn: tenantService.create,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: tenantQueries.all().queryKey });
            toast.success(MESSAGES.tenant.createSuccess);
        },

        onError: (error) => {
            const msg = error.response?.data?.message ?? MESSAGES.tenant.createFailed;
            toast.error(msg);
        },
    });
};
