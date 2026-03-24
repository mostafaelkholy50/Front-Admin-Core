import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./contexts/AuthContext";
import { router } from "./routes";
import { queryClient } from "./lib/queryClient";
import "./index.css";

const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
    key: "REACT_QUERY_CACHE",
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{
                persister: localStoragePersister,
                maxAge: 1000 * 60 * 60 * 24, // 24 hours
            }}
        >
            <AuthProvider>
                {/* RouterProvider replaces BrowserRouter + App.tsx entirely */}
                <RouterProvider router={router} />
                <Toaster
                    position="top-right"
                    toastOptions={{
                        duration: 4000,
                        style: {
                            fontFamily: "inherit",
                            direction: "rtl",
                        },
                    }}
                />
            </AuthProvider>
        </PersistQueryClientProvider>
    </StrictMode>
);
