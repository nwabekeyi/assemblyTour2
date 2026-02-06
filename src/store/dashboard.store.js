// store/dashboard.store.js
import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const useDashboardStore = create((set, get) => ({
  registration: null,
  loading: false,
  error: null,
  hasFetched: false,

  fetchMyRegistration: async () => {
    if (get().hasFetched || get().loading) return;

    set({ loading: true, error: null });

    try {
      const response = await axios.get("/registration/my/", { useAuth: true });
      set({
        registration: response.data,
        loading: false,
        hasFetched: true,
        error: null,
      });
    } catch (err) {
      set({ 
        loading: false,
        error: err.errors || ["Failed to load registration"],
        hasFetched: true
      });

      if (err.status !== 404 && err.status !== 0) {
        (err.errors || ["Something went wrong"]).forEach(msg => toast.error(msg));
      }
    }
  },

  refreshRegistration: async () => {
    set({ loading: true, error: null, hasFetched: false });
    await get().fetchMyRegistration();
  },

  submitAccountSetup: async (data) => {
    set({ loading: true, error: null });

    const res = await axios.post("/hajj/step/account-setup/", data, { useAuth: true }).catch(err => err.response);

    if (res?.success) {
      set({ registration: res, error: null });
    } else {
      set({ error: res?.errors || ["Account setup failed"] });
      toast.error(res?.message || "Account setup failed");
    }

    set({ loading: false });
  },

  submitRegistrationForm: async (formData) => {
    set({ loading: true, error: null });

    const res = await axios.patch("/hajj/step/registration-form/", formData, {
      useAuth: true,
    }).catch(err => err.response);

    if (res?.success) {
      set({ registration: res, error: null });
    } else {
      set({ error: res?.errors || ["Registration form submission failed"] });
      toast.error(res?.message || "Registration form submission failed");
    }

    set({ loading: false });
  },

  submitDocumentUpload: async (formData) => {
    set({ loading: true, error: null });

    const res = await axios.post("/hajj/step/document-upload/", formData, {
      useAuth: true,
    }).catch(err => err.response);

    if (res?.success) {
      set({ registration: res, error: null });
    } else {
      set({ error: res?.errors || ["Document upload failed"] });
      toast.error(res?.message || "Document upload failed");
    }

    set({ loading: false });
  },

  clear: () => {
    set({
      registration: null,
      loading: false,
      error: null,
      hasFetched: false,
    });
  },
}));

export default useDashboardStore;