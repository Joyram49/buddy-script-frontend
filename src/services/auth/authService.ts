"use server";
import { envConfig } from "@/config/envConfig";
import { LoginWithEmailSchema, SignUpSchema } from "@/lib/zod/auth/auth.validation";
import { deleteCookie } from "cookies-next";
import { cookies } from "next/headers";
import type { AuthSession, IMyProfile, User } from "@/types/auth/auth.type";
import z from "zod";

interface LoginUserArgs {
  payload: z.infer<typeof LoginWithEmailSchema>;
}

type SignUpArgs = {
  payload: z.infer<typeof SignUpSchema>;
};

const parseJsonResponse = async <T>(res: Response): Promise<T> => {
  const raw = await res.text();
  if (!raw) {
    return {} as T;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new Error(
      `Received non-JSON response (${res.status}) from ${res.url}. Check NEXT_PUBLIC_BACKEND_BASE_URL in production.`,
    );
  }
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
    const result = await parseJsonResponse<{
      success?: boolean;
      data?: { otpToken?: { token?: string } };
      message?: string;
    }>(res);

    if (result?.success) {
      const cookieStore = await cookies();
      const otpToken = result?.data?.otpToken?.token;
      if (otpToken) {
        cookieStore.set("otpToken", otpToken);
      }
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const loginAction = async ({ payload }: LoginUserArgs): Promise<AuthSession> => {
  try {
    const res = await fetch(`${envConfig.backendBaseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });

    const result = await parseJsonResponse<{
      success?: boolean;
      data?: { accessToken?: string; user?: User };
      message?: string;
    }>(res);

    if (!res.ok || !result.success) {
      throw new Error(result.message || "Login failed");
    }

    const accessToken = result?.data?.accessToken as string | undefined;
    const user = result?.data?.user as User | undefined;
    if (!accessToken || !user) {
      throw new Error("Invalid login response from server");
    }

    (await cookies()).set("accessToken", accessToken, {
      httpOnly: false,
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
      sameSite: "lax",
      secure: !envConfig.isDevlopment,
    });

    return { accessToken, user };
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Login failed");
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
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Logout failed",
    };
  }
};

// get current user
export const getCurrentUser = async (): Promise<IMyProfile> => {
  try {
    const token = await getAccessToken();

    if (!token || token === "undefined" || token === "null") {
      throw new Error("No valid access token found");
    }

    const res = await fetch(`${envConfig.backendBaseUrl}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 300 },
    });
    const result = await parseJsonResponse<{
      success?: boolean;
      data?: { user?: IMyProfile };
      message?: string;
    }>(res).catch(() => ({}));

    if (!res.ok || !result.success) {
      throw new Error(result.message || `Failed to fetch user (Status: ${res.status})`);
    }

    const user = result?.data?.user as IMyProfile | undefined;
    if (!user) {
      throw new Error("Invalid user payload from server");
    }
    return user;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "An unexpected error occurred");
  }
};
