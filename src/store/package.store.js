import { create } from "zustand";
import axios from "../lib/axios";
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
    try {
      const res = await axios.get("/packages/navbar-overview/");

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
    } catch (error) {
      set({ loading: false, error: error.message || "An error occurred" });
      toast.error(error.message || "An error occurred");
    }
  },

  // Fetch all packages (optionally filtered by category)
  fetchAllPackages: async (category = "") => {
    set({ loading: true, error: null });
    try {
      // If category is provided, pass it as a query param
      const url = category ? `/packages/?category=${category}` : "/packages/";
      const res = await axios.get(url);

      if (res.success) {
        set({ allPackages: res.data?.data || [], loading: false });
      } else {
        set({ loading: false, error: res.message });
        toast.error(res.message || "Failed to fetch packages");
      }
    } catch (error) {
      set({ loading: false, error: error.message || "An error occurred" });
      toast.error(error.message || "An error occurred");
    }
  },

  // Fetch package by ID for detail page
  fetchPackageById: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`/packages/${id}/`);
      if (res.success) {
        set({ packageDetail: res.data, loading: false });
      } else {
        set({ loading: false, error: res.message });
        toast.error(res.message || "Failed to fetch package details");
      }
    } catch (error) {
      set({ loading: false, error: error.message || "An error occurred" });
      toast.error(error.message || "An error occurred");
    }
  },
}));

export default usePackageStore;
