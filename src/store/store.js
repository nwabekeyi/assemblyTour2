import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

const USER_STORAGE_KEY = "user_profile";

const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(USER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    window.localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
};

const persistUser = (user) => {
  if (typeof window === "undefined") return;
  try {
    if (user) {
      window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(USER_STORAGE_KEY);
    }
  } catch (error) {
    window.localStorage.removeItem(USER_STORAGE_KEY);
  }
};

const useAuthStore = create((set, get) => ({
  user: getStoredUser(),           // Authenticated user profile
  loading: false,
  checkingAuth: true,

/* =======================
     SIGNUP
   ======================= */
  signup: async ({ email, package_id }) => {
    if (!email) {
      toast.error("Email is required");
      return { success: false };
    }

    set({ loading: true });

    try {
      const res = await axiosInstance.post(
        "/auth/",
        {
          action: "register",
          email,
          package_id,
        },
        { useAuth: false }
      );

      if (!res.success) {
        set({ loading: false });
        const errorMsg = res.errors?.detail || res.message || "Registration failed";
        toast.error(errorMsg);
        return res;
      }

      toast.success("Registration successful! Check your email for login credentials.");
      set({ loading: false });
      return res;
    } catch (err) {
      set({ loading: false });
      const errorMsg = err?.errors?.detail || err?.message || "Registration failed";
      toast.error(errorMsg);
      console.error("Registration error:", err);
      return { success: false, error: err };
    }
  },

  /* =======================
     LOGIN
  ======================= */
  login: async ({ username, password }) => {
    if (!username || !password) {
      toast.error("Username and password are required");
      return { success: false };
    }

    set({ loading: true });

    try {
      const res = await axiosInstance.post(
        "/auth/",
        {
          action: "login",
          username,
          password,
        },
        { useAuth: false }
      );

      if (!res.success) {
        set({ loading: false });
        // Show the actual error message from backend
        const errorMsg = res.errors?.detail || res.message || "Login failed";
        toast.error(errorMsg);
        return { success: false };
      }

      const { tokens } = res.data;

      // store tokens
      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("refresh_token", tokens.refresh);

      // fetch authenticated user profile
      const profileRes = await axiosInstance.get("/user/profile/", { useAuth: true });
      persistUser(profileRes.data);
      set({ user: profileRes.data });

      toast.success(res.message || "Login successful");
      set({ loading: false });
      return { success: true };
    } catch (err) {
      set({ loading: false });
      // Show the actual error message from the formatted error
      const errorMsg = err?.errors?.detail || err?.message || "Login failed";
      toast.error(errorMsg);
      console.error("Login error:", err);
      return { success: false, error: err };
    }
  },

  /* =======================
     AUTH CHECK
  ======================= */
  checkAuth: async () => {
    const res = await axiosInstance.get("/user/profile/", { useAuth: true });
    persistUser(res.data);
    set({ user: res.data, checkingAuth: false });
  },

/* =======================
      LOGOUT
   ======================= */
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout/", {}, { useAuth: true });
    } catch (error) {
      // Continue with logout even if API call fails
    }
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    persistUser(null);
    set({ user: null });
    toast.success("Logged out");
  },

  /* =======================
     REFRESH TOKEN
  ======================= */
  refreshToken: async () => {
    if (get().checkingAuth) return;

    set({ checkingAuth: true });

    const res = await axiosInstance.post(
      "/auth/refresh/",
      { refresh: localStorage.getItem("refresh_token") },
      { useAuth: false }
    );

    localStorage.setItem("access_token", res.data.access);

    // fetch updated authenticated user profile
    const profileRes = await axiosInstance.get("/user/profile/", { useAuth: true });
    persistUser(profileRes.data);
    set({ user: profileRes.data, checkingAuth: false });

    return profileRes.data;
  },
}));

export default useAuthStore;
