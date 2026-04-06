/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { envConfig } from "@/config/envConfig";
import { LoginWithEmailSchema, SignUpSchema } from "@/lib/zod/auth/auth.validation";
import { deleteCookie } from "cookies-next";
import { cookies } from "next/headers";
import z from "zod";

interface LoginUserArgs {
  payload: z.infer<typeof LoginWithEmailSchema>;
}

type SignUpArgs = {
  payload: z.infer<typeof SignUpSchema>;
};

// Set access token to cookies
export const setAccessToken = async (accessToken: string) => {
  (await cookies()).set("accessToken", accessToken, {
    httpOnly: false,
    maxAge: 7 * 24 * 60 * 60, // 7 day
    path: "/",
    sameSite: "lax",
    secure: !envConfig.isDevlopment,
  });
};

// Get current user through access token
export const getAccessToken = async () => {
  const accessToken = (await cookies()).get("accessToken")?.value;
  return accessToken;
};
export const clearTokens = async (): Promise<void> => {
  await deleteCookie("accessToken");
};

// ---------------- Sign Up ----------------
export const signUpAction = async ({ payload }: SignUpArgs) => {
  try {
    const res = await fetch(`${envConfig.backendBaseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const result = await res.json();

    if (result?.success) {
      const cookieStore = await cookies();
      cookieStore.set("otpToken", result?.data?.otpToken?.token);
    }

    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const loginAction = async ({ payload }: LoginUserArgs): Promise<any> => {
  try {
    console.log(payload);
    // Defaulting to student login for now based on requirement
    // TODO: support dynamic roles if needed
    const res = await fetch(`${envConfig.backendBaseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    // Check if the response indicates an error
    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || "Login failed",
      };
    }

    if (result.token) {
      (await cookies()).set("accessToken", result.token, {
        httpOnly: false,
        maxAge: 7 * 24 * 60 * 60, // 7 day
        path: "/",
        sameSite: "lax",
        secure: !envConfig.isDevlopment,
      });
    }

    return {
      success: true,
      message: "Logged in successfully",
      data: result.user,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Login failed",
    };
  }
};

export const logoutAction = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");

    return { success: true, message: "Logged out successfully" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Logout failed" };
  }
};

// get current user
export const getCurrentUser = async (): Promise<any> => {
  try {
    const token = await getAccessToken();

    if (!token || token === "undefined" || token === "null") {
      return {
        success: false,
        message: "No valid access token found",
      };
    }

    const res = await fetch(`${envConfig.backendBaseUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Adding cache control to prevent unnecessary duplicate requests
      next: { revalidate: 300 }, // 5 minutes cache
    });

    if (!res.ok) {
      const result = await res.json().catch(() => ({}));
      return {
        success: false,
        message: result.message || `Failed to fetch user (Status: ${res.status})`,
      };
    }

    const result = await res.json();

    if (!result.success) {
      return {
        success: false,
        message: result.message || "Failed to fetch user",
      };
    }

    return {
      success: true,
      data: result.data?.user, // Backend returns { data: user }
    };
  } catch (error: any) {
    // Handle network errors like ECONNREFUSED gracefully
    return {
      success: false,
      message:
        error.code === "ECONNREFUSED"
          ? "Backend server is unreachable. Please check if the backend is running."
          : error.message || "An unexpected error occurred",
    };
  }
};
