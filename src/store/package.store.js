import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

const usePackageStore = create((set, get) => ({
  // Navbar packages
  packages: { umrah: [], hajj: [] },

  // All packages (for PackagesPage)
  allPackages: [],

  packageDetail: null,
  loading: false,
  error: null,

  // Fetch navbar overview packages
  fetchNavbarPackages: async () => {
    set({ loading: true, error: null });

    const res = await axiosInstance.get("/packages/navbar-overview/", { useAuth: false });

    if (res.success) {
      set({
        packages: {
          umrah: res.data.umrah || [],
          hajj: res.data.hajj || [],
        },
        loading: false,
      });
    } else {
      set({ loading: false, error: res.message });
      toast.error(res.message || "Failed to fetch packages for nav");
    }
  },

  // Fetch all packages (optionally filtered by category)
  fetchAllPackages: async (category = "") => {
    set({ loading: true, error: null });

    const url = category ? `/packages/?category=${category}` : "/packages/";
    const res = await axiosInstance.get(url, { useAuth: false });

    if (res.success) {
      set({ allPackages: res.data?.data || [], loading: false });
    } else {
      set({ loading: false, error: res.message });
      toast.error(res.message || "Failed to fetch packages");
    }
  },

  // Fetch package by ID for detail page
  fetchPackageById: async (id) => {
    set({ loading: true, error: null });

    const res = await axiosInstance.get(`/packages/${id}/`, { useAuth: false });

    if (res.success) {
      set({ packageDetail: res.data, loading: false });
    } else {
      set({ loading: false, error: res.message });
      toast.error(res.message || "Failed to fetch package details");
    }
  },
}));

export default usePackageStore;
