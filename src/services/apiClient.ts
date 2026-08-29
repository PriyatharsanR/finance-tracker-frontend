import axios from "axios";

// Standard utility to retrieve cookie on the client side
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }
  return null;
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // If the token is available, inject it into the Authorization header
    const token = getCookie("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (response.data && typeof response.data.code === "string" && response.data.code !== "200") {
      return Promise.reject(new Error(response.data.message || "Request failed"));
    }
    return response;
  },
  (error) => {
    // Basic global error handling
    if (error.response?.status === 401) {
      // Token is invalid/expired
      // Handled at the application level (e.g. redirecting to /login)
      if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
         // Could force logout or redirect
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
