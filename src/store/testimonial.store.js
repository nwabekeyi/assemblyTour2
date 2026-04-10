import { create } from "zustand";
import axiosInstance from "../lib/axios";

const useTestimonialStore = create((set) => ({
  testimonials: [],
  loading: false,
  error: null,

  fetchTestimonials: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/testimonials/", { useAuth: false });
      if (res.success) {
        set({ testimonials: res.data, loading: false });
      } else {
        set({ error: res.message, loading: false });
      }
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useTestimonialStore;