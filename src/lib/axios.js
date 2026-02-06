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
===================================================== */
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.useAuth === true) {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.resolve(formatError(error))
);

/* =====================================================
   RESPONSE INTERCEPTOR
===================================================== */
axiosInstance.interceptors.response.use(
  async (response) => {
    const res = response.data;

    // Backend returned success:false with 200
    if (res?.success === false) {
      return formatError({ response });
    }

    // Standard API shape
    if (
      typeof res === "object" &&
      "success" in res &&
      "message" in res &&
      "data" in res
    ) {
      return res;
    }

    // Fallback success wrapper
    return {
      success: true,
      message: "",
      data: res,
      errors: null,
      status: response.status,
    };
  },

  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh globally
    if (
      error.response?.status === 401 &&
      originalRequest?.useAuth === true &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        return formatError(error);
      }

      try {
        const refreshRes = await axios.post(`${API_URL}/auth/refresh/`, {
          refresh: refreshToken,
        });

        const newAccess = refreshRes.data?.data?.access;
        if (!newAccess) {
          return formatError(refreshRes);
        }

        localStorage.setItem("access_token", newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        return formatError(refreshError);
      }
    }

    // Catch EVERYTHING else
    return formatError(error);
  }
);

/* =====================================================
   Error formatting – Prioritizing errors.detail & validation
===================================================== */
function formatError(error) {
  if (error?.response?.data) {
    const res = error.response.data;
    let formattedErrors = [];

    // CASE 1 & 2: errors object
    if (res.errors && typeof res.errors === "object" && !Array.isArray(res.errors)) {
      if (res.errors.detail) {
        formattedErrors.push(res.errors.detail);
      } else {
        Object.entries(res.errors).forEach(([field, messages]) => {
          if (field === "code") return;

          if (Array.isArray(messages)) {
            messages.forEach((msg) => {
              const display =
                typeof msg === "string" ? msg : JSON.stringify(msg);
              formattedErrors.push(
                `${field.replace(/_/g, " ")}: ${display}`
              );
            });
          } else if (typeof messages === "string") {
            formattedErrors.push(
              `${field.replace(/_/g, " ")}: ${messages}`
            );
          }
        });
      }
    }

    // CASE 3: errors already array/string
    else if (res.errors) {
      formattedErrors = Array.isArray(res.errors)
        ? res.errors
        : [res.errors];
    }

    const finalErrors =
      formattedErrors.length > 0
        ? formattedErrors
        : [res.message || res.detail || "An unexpected error occurred"];

    return {
      success: false,
      message: res.message || "Request failed",
      data: res.data || null,
      errors: finalErrors,
      status: error.response.status,
    };
  }

  // Network / CORS / server down
  return {
    success: false,
    message: "Network error or server unreachable",
    data: null,
    errors: [error?.message || "Unknown error"],
    status: 0,
  };
}

export default axiosInstance;
