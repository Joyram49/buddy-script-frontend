/**
 * make sure every NEXT_PUBLIC_ env is define in Dockerfile
 */

const getBackendBaseUrl = () => {
  console.log("process.env.NEXT_PUBLIC_BACKEND_BASE_URL", process.env.NEXT_PUBLIC_BACKEND_BASE_URL);
  if (process.env.NEXT_PUBLIC_BACKEND_BASE_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  }
  if (typeof window !== "undefined") {
    return `${window.location.origin}`;
  }
  // For Vercel SSR
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:4000";
};

export const getAppBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  return "http://localhost:3000";
};

export const envConfig = {
  backendBaseUrl: getBackendBaseUrl(),
  appBaseUrl: getAppBaseUrl(),

  mode: process.env.NODE_ENV === "development",
  isDevlopment: process.env.NODE_ENV === "development",
};
