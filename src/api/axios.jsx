import axios from "axios";

function getBaseURL() {
    const host = window.location.host;
    
    // Check if running on localhost, local network IP (for mobile testing), or a local test domain
    const isLocal = 
        host.includes("localhost") || 
        host.includes("127.0.0.1") || 
        host.startsWith("192.168.") || 
        host.includes("core.test");

    if (isLocal) {
        return "/api"; // Required for Vite Proxy to intercept
    }

    // Fixed Bug: Removed redundant split and join string manipulation.
    return `https://${host}/api`;
}

export const api = axios.create({
    baseURL: getBaseURL(),
    headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
});

// Request Interceptor: Attach the Authorization Token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor: Global Error Handling (e.g., Token Expiry)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Automatically handle 401 Unauthorized (Expired Token)
        if (error.response && error.response.status === 401) {
            console.warn("Unauthorized! Clearing token...");
            localStorage.removeItem("token");
            
            // Optionally redirect the user to a login page if you have one.
            // window.location.href = '/login'; 
        }
        
        return Promise.reject(error);
    }
);