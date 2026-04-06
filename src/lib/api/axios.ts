import axios from "axios";
import { getCookie } from "cookies-next";

const baseConfig = {
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:4000/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const publicApiClient = axios.create(baseConfig);
export const privateApiClient = axios.create(baseConfig);

// Add request interceptor to automatically add JWT token
privateApiClient.interceptors.request.use(
  async (config) => {
    // Get token safely based on environment
    let token;

    if (typeof window !== "undefined") {
      // Client-side: get from cookies-next
      token = getCookie("accessToken");
    } else {
      // Server-side (Optional): You might want to pass it explicitly
      // or handle it via a separate server-side utility.
      // For now, let's assume server components pass headers if needed
      // or we import the server-only getter dynamically to avoid bundling issues.
      const { getAccessToken } = await import("@/services/auth/authService");
      token = await getAccessToken();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Add response interceptor for error handling
privateApiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      // Clear invalid tokens
      if (typeof window !== "undefined") {
        // Client-side logout trigger
        // We can't clear httpOnly cookies here if they were httpOnly,
        // but authService sets them as accessible.
        // Better to call a server action to clear them or use the logout endpoint.
        // For now, let's just redirect.
        window.location.href = "/login"; // Or appropriate login route
      }
    }
    return Promise.reject(error);
  },
);

export default privateApiClient;
