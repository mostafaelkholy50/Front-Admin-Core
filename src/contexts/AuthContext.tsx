import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService } from "../api/services/auth.service";
import { api } from "../api/axios";
import { MESSAGES } from "../constants/messages";
import { AuthStorage } from "../utils/auth.storage";
import type { User } from "../types/api.types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface AuthContextValue {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * useAuth — the ONLY way components should access auth state.
 * Never call useContext(AuthContext) directly in a component.
 */
export const useAuth = (): AuthContextValue => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
    return ctx;
};

// ─── Provider ─────────────────────────────────────────────────────────────────

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser]     = useState<User | null>(null);
    const [token, setToken]   = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Rehydrate session from localStorage once on mount
    useEffect(() => {
        if (AuthStorage.isAuthenticatedAdmin()) {
            const token = AuthStorage.getToken()!;
            const user = AuthStorage.getUser()!;
            
            setToken(token);
            setUser(user);
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            AuthStorage.clearAuth();
        }

        setIsLoading(false);
    }, []);

    /**
     * login — calls the service, validates role, sets state.
     * Throws on failure so the Login page can catch and show it via toast.
     */
    const login = async (email: string, password: string): Promise<void> => {
        const data = await authService.login({ email, password });

        if (!data.token) {
            throw new Error(MESSAGES.auth.noTokenReturned);
        }
        if (data.user?.role !== "SuperAdmin") {
            throw new Error(MESSAGES.auth.unauthorized);
        }

        // Single place where token is written to storage via utility
        AuthStorage.setAuth(data.token, data.user);
        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        setToken(data.token);
        setUser(data.user);
    };

    /**
     * logout — clears server session, localStorage, and React state.
     */
    const logout = async (): Promise<void> => {
        try {
            await authService.logout();
        } catch {
            // Always succeed on the client even if API call fails
        }
        
        AuthStorage.clearAuth();
        delete api.defaults.headers.common["Authorization"];
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated: !!token,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
