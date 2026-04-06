import axios, { AxiosError } from "axios";
import { getCookie } from "cookies-next";
import { clearClientSession } from "@/lib/auth/clientSession";

export interface ApiSuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
  meta?: Record<string, unknown>;
}

interface ApiErrorResponse {
  success?: false;
  code?: string;
  message?: string;
}

const baseConfig = {
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL || "http://localhost:4000/",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
};

export const publicApi = axios.create(baseConfig);
export const privateApi = axios.create(baseConfig);

privateApi.interceptors.request.use((config) => {
  const token = getCookie("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

privateApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status;
    const code = error.response?.data?.code;
    if (typeof window !== "undefined" && (status === 401 || code === "UNAUTHORIZED")) {
      clearClientSession();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export function unwrapApiResponse<T>(response: { data: ApiSuccessResponse<T> }): T {
  return response.data.data;
}

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong"): string {
  if (error instanceof AxiosError) {
    const message = (error.response?.data as ApiErrorResponse | undefined)?.message;
    return message || error.message || fallback;
  }
  if (error instanceof Error) {
    return error.message || fallback;
  }
  return fallback;
}
