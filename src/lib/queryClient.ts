import { QueryClient } from "@tanstack/react-query";

/**
 * Global Query Client
 *
 * Extracted so it can be used outside of React (e.g. in React Router loaders).
 */
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});
