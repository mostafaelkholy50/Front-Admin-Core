import type { User } from "../types/api.types";

/**
 * Centralized utility for handling Authentication Storage securely.
 * This prevents duplicating localStorage logic and JSON parsing across components & router loaders.
 */
export const AuthStorage = {
    getToken: (): string | null => {
        return localStorage.getItem("token");
    },
    
    getUser: (): User | null => {
        const userStr = localStorage.getItem("user");
        if (!userStr) return null;
        try {
            return JSON.parse(userStr) as User;
        } catch {
            return null; // Handle corrupted string JSON safely
        }
    },

    /**
     * Reusable check to immediately decide if the user deserves access to admin panel.
     */
    isAuthenticatedAdmin: (): boolean => {
        const token = AuthStorage.getToken();
        const user = AuthStorage.getUser();
        
        return !!token && !!user && user.role === "SuperAdmin";
    },

    setAuth: (token: string, user: User): void => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
    },

    clearAuth: (): void => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
};
