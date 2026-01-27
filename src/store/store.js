import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const useAuthStore = create((set, get) => ({
  user: null,           // Authenticated user profile
  loading: false,
  checkingAuth: true,

  /* =======================
     SIGNUP
  ======================= */
  signup: async ({ phone, turnstileToken }) => {
    if (!turnstileToken) {
      toast.error("Please complete the Turnstile challenge");
      return { success: false };
    }

    set({ loading: true });

    try {
      const res = await axios.post("/auth/", {
        action: "register",
        phone,
        turnstileToken,
      });

      if (!res.success) {
        toast.error(res.message || "Registration failed");
        return res;
      }

      toast.success(res.message || "Registration successful");
      return res;
    } catch (error) {
      toast.error(
        error.response.message || "An error occurred during signup"
      );
      return { success: false };
    } finally {
      set({ loading: false });
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
      const res = await axios.post("/auth/", {
        action: "login",
        username,
        password,
      });

      if (!res.success) {
        toast.error(res.message || "Login failed");
        return { success: false };
      }

      const { tokens } = res.data;

      // store tokens
      localStorage.setItem("access_token", tokens.access);
      localStorage.setItem("refresh_token", tokens.refresh);

      // fetch authenticated user profile
      const profileRes = await axios.get("/user/profile/");
      const userProfile = profileRes.data;

      set({ user: userProfile });

      toast.success(res.message || "Login successful");
      return { success: true };
    } catch (error) {
      toast.error(
        error.message || "An error occurred during login"
      );
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  /* =======================
     AUTH CHECK
  ======================= */
  checkAuth: async () => {
    try {
      const res = await axios.get("/user/profile/");
      set({ user: res.data });
    } catch {
      set({ user: null });
    } finally {
      set({ checkingAuth: false });
    }
  },

  /* =======================
     LOGOUT
  ======================= */
  logout: async () => {
    try {
      await axios.post("/auth/logout");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      set({ user: null });
      toast.success("Logged out");
    } catch {
      toast.error("Failed to log out.");
    }
  },

  /* =======================
     REFRESH TOKEN
  ======================= */
  refreshToken: async () => {
    if (get().checkingAuth) return;

    set({ checkingAuth: true });

    try {
      const res = await axios.post("/auth/refresh-token", {
        refresh: localStorage.getItem("refresh_token"),
      });

      localStorage.setItem("access_token", res.access);

      // fetch updated authenticated user profile
      const profileRes = await axios.get("/auth/profile");
      set({ user: profileRes.data });

      return profileRes.data;
    } catch {
      toast.error("Session expired. Please log in again.");
      set({ user: null });
    } finally {
      set({ checkingAuth: false });
    }
  },
}));

export default useAuthStore;
