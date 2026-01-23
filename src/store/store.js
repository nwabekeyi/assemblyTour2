import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const useAuthStore = create((set, get) => ({
  user: null,
  alluser: null,
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

      if (!res.data?.success) {
        toast.error(res.data?.message || "Registration failed");
        return { success: false };
      }

      toast.success(res.data?.message || "Registration successful");
      return { success: true };
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during signup"
      );
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  /* =======================
     LOGIN (username + password)
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
        toast.error(res.data?.message || "Login failed");
        return { success: false };
      }

      // adjust if backend returns { user, token }
      set({ user: res.data.user});

      toast.success(res.message || "Login successful");
      return { success: true };
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred during login"
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
      const res = await axios.get("/auth/profile");
      set({ user: res.data });
    } catch {
      set({ user: null });
    } finally {
      set({ checkingAuth: false });
    }
  },

  /* =======================
     GET ALL USERS
     ======================= */
  getAllUser: async () => {
    try {
      const res = await axios.get("/auth/alluser");
      set({ alluser: res.data });
    } catch {
      toast.error("Failed to fetch users.");
    }
  },

  /* =======================
     LOGOUT
     ======================= */
  logout: async () => {
    try {
      await axios.post("/auth/logout");
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
      const res = await axios.post("/auth/refresh-token");
      set({ user: res.data });
      return res.data;
    } catch {
      toast.error("Session expired. Please log in again.");
      set({ user: null });
    } finally {
      set({ checkingAuth: false });
    }
  },
}));

export default useAuthStore;
