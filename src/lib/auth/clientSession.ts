const ACCESS_TOKEN_KEY = "accessToken";

export function clearClientSession() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem("authUser");

  document.cookie = "access_token=; path=/; max-age=0; samesite=lax";
  document.cookie = "accessToken=; path=/; max-age=0; samesite=lax";
}
