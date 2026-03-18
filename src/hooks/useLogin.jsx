// src/hooks/useLogin.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/axios";

export function useLogin() {
    return useMutation({
        mutationFn: ({ email, password }) =>
            api.post("/login", { email, password }).then(res => res.data),
        onSuccess: (data) => {
            if (data.status === 200 || data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
            }
        },
        onError: (error) => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            console.error("Login failed:", error);
        },
    });
}