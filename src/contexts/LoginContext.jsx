import { createContext, useState, useEffect } from "react";
import { useLogin } from "../hooks/useLogin";
import { api } from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [message, setMessage] = useState("");

  const loginMutation = useLogin();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser?.role === "SuperAdmin") {
          setToken(savedToken);
          setUser(parsedUser);
          setIsAuthenticated(true);
          api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch (e) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setIsLoading(false); 
  }, []); 

  const login = async (email, password) => {
    try {
      const data = await loginMutation.mutateAsync({ email, password });
      if (data.token) {
        if (data.user?.role === "SuperAdmin") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setToken(data.token);
          setUser(data.user);
          setIsAuthenticated(true);
          api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
          setMessage("تم تسجيل الدخول بنجاح");
          return true;
        } else {
          setMessage("عذراً، هذا الحساب غير مصرح له بالدخول كمسؤول");
          return false;
        }
      }
      return false;
    } catch (err) {
      const msg = err?.response?.data?.message || "فشل تسجيل الدخول";
      setMessage(msg);
      setIsAuthenticated(false);
      setToken(null);
      setUser(null);
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch {}
    localStorage.clear();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        token,
        isAuthenticated,
        isLoading,
        message,
        clearMessage: () => setMessage(""),
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error?.response?.data?.message,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}