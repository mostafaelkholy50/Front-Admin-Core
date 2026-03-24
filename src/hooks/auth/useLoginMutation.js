import { useMutation } from "@tanstack/react-query";
import { authService } from "../../api/services/auth.service.js";

/**
 * Login mutation hook.
 * Does NOT write to localStorage — that's AuthContext's responsibility.
 */
export const useLoginMutation = () => {
    return useMutation({
        mutationFn: authService.login,
    });
};
