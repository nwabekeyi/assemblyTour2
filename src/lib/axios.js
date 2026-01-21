import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/**
 * Response Interceptor
 * Ensures frontend always receives backend response format
 */
axiosInstance.interceptors.response.use(
  (response) => {
    const res = response.data;

    // If backend already uses api_response
    if (
      typeof res === "object" &&
      "success" in res &&
      "message" in res &&
      "data" in res
    ) {
      return res;
    }

    // Fallback (for unexpected responses)
    return {
      success: true,
      message: "",
      data: res,
      errors: null,
    };
  },
  (error) => {
    // Backend responded with error
    if (error.response?.data) {
      const res = error.response.data;

      return Promise.reject({
        success: false,
        message: res.message || "Request failed",
        data: null,
        errors: res.errors || res,
        status: error.response.status,
      });
    }

    // Network / unknown error
    return Promise.reject({
      success: false,
      message: "Network error",
      data: null,
      errors: error.message,
      status: 0,
    });
  }
);

export default axiosInstance;
