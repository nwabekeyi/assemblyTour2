import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Axios instance
 */
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/* =====================================================
   REQUEST INTERCEPTOR
   - Always attach access token if available
===================================================== */
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* =====================================================
   RESPONSE INTERCEPTOR
   - Normalize backend responses
   - Handle 401 → refresh token → retry once
===================================================== */
axiosInstance.interceptors.response.use(
  (response) => {
    const res = response.data;

    // Backend already follows api_response format
    if (
      typeof res === "object" &&
      "success" in res &&
      "message" in res &&
      "data" in res
    ) {
      return res;
    }

    // Fallback normalization
    return {
      success: true,
      message: "",
      data: res,
      errors: null,
    };
  },
  async (error) => {
    const originalRequest = error.config;

    // =========================
    // 401 → try refresh token
    // =========================
    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        forceLogout();
        return Promise.reject(formatError(error));
      }

      try {
        const refreshRes = await axios.post(
          `${API_URL}/auth/token/refresh/`,
          { refresh: refreshToken }
        );

        const newAccess = refreshRes.data.access;

        // Save new access token
        localStorage.setItem("access_token", newAccess);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        forceLogout();
        return Promise.reject(formatError(refreshError));
      }
    }

    return Promise.reject(formatError(error));
  }
);

/* =====================================================
   Helpers
===================================================== */

function forceLogout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");

  // optional hard redirect
  window.location.href = "/login";
}

function formatError(error) {
  if (error.response?.data) {
    const res = error.response.data;

    return {
      success: false,
      message: res.message || "Request failed",
      data: null,
      errors: res.errors || res,
      status: error.response.status,
    };
  }

  return {
    success: false,
    message: "Network error",
    data: null,
    errors: error.message,
    status: 0,
  };
}

export default axiosInstance;
