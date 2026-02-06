import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

const useAuthStore = create((set, get) => ({
  user: null,           // Authenticated user profile
  loading: false,
  checkingAuth: true,

  /* =======================
     SIGNUP
  ======================= */
  signup: async ({ phone, turnstileToken, package_id }) => {
    if (!turnstileToken) {
      toast.error("Please complete the Turnstile challenge");
      return { success: false };
    }

    set({ loading: true });

    const res = await axiosInstance.post(
      "/auth/",
      {
        action: "register",
        phone,
        turnstileToken,
        package_id,
      },
      { useAuth: false } // registration does not need access token
    );

    if (!res.success) {
      toast.error(res.message || "Registration failed");
      set({ loading: false });
      return res;
    }

    toast.success(res.message || "Registration successful");
    set({ loading: false });
    return res;
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

    const res =  await axiosInstance.post(
      "/auth/",
      {
        action: "login",
        username,
        password,
      },
      { useAuth: false }
    );


    if (!res.success) {
      toast.error(res.message || "Login failed");
      set({ loading: false });
      return { success: false };
    }

    const { tokens } = res.data;

    // store tokens
    localStorage.setItem("access_token", tokens.access);
    localStorage.setItem("refresh_token", tokens.refresh);

    // fetch authenticated user profile
    const profileRes = await axiosInstance.get("/user/profile/", { useAuth: true });
    set({ user: profileRes.data });

    toast.success(res.message || "Login successful");
    set({ loading: false });
    return { success: true };
  },

  /* =======================
     AUTH CHECK
  ======================= */
  checkAuth: async () => {
    const res = await axiosInstance.get("/user/profile/", { useAuth: true });
    set({ user: res.data, checkingAuth: false });
  },

  /* =======================
     LOGOUT
  ======================= */
  logout: async () => {
    await axiosInstance.post("/auth/logout/", {}, { useAuth: true });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
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
    set({ user: profileRes.data, checkingAuth: false });

    return profileRes.data;
  },
}));

export default useAuthStore;
