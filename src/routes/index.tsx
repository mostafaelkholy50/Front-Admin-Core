import { createBrowserRouter, redirect } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../pages/Admin/Layout/AdminLayout";
import Dashboard from "../pages/Admin/index";
import Tenant from "../pages/Admin/tenant";
import Login from "../pages/Auth/Login";
import { queryClient } from "../lib/queryClient"; // We'll extract queryClient so the router can use it
import { tenantQueries } from "../api/queries/tenant.queries";
import { stateQueries } from "../api/queries/state.queries";

import { AuthStorage } from "../utils/auth.storage";

/**
 * Global Router Configuration (React Router v7 Data API)
 *
 * Why this is the "Newest / Best Practice":
 * 1. Render-as-you-fetch: Loaders trigger data fetching *before* the component even mounts.
 * 2. Parallel Fetching: The router fetches JS chunks and API data at the exact same time.
 * 3. Centralized Protection: `loader` functions can block unauthenticated users instantly
 *    without causing flash-of-unauthenticated-content (FOUC).
 */
export const router = createBrowserRouter([
    {
        path: "/",
        // ProtectedRoute handles auth checks at the component level,
        // but we also have loader protection for absolute security.
        element: <ProtectedRoute />,
        loader: () => {
            if (!AuthStorage.isAuthenticatedAdmin()) {
                return redirect("/login");
            }
            return null;
        },
        children: [
            {
                element: <AdminLayout />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                        // The magic: fetch dashboard stats before the page renders!
                        loader: async () => {
                            return await queryClient.ensureQueryData(stateQueries.dashboard());
                        },
                    },
                    {
                        path: "tenant",
                        element: <Tenant />,
                        // Start fetching tenants the millisecond the user navigates here
                        loader: async () => {
                            return await queryClient.ensureQueryData(tenantQueries.all());
                        },
                    },
                ],
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
        loader: () => {
            // If already logged in as Admin, redirect away from login instantly
            if (AuthStorage.isAuthenticatedAdmin()) {
                return redirect("/");
            }
            return null;
        },
    },
]);
