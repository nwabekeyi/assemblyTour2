// store/dashboard.store.js
import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const useDashboardStore = create((set, get) => ({
  registration: null,
  travelDocuments: [],
  supportTickets: [],
  userStats: null,
  loading: false,
  error: null,
  hasFetched: false,

  fetchMyRegistration: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get("/registration/my/", { useAuth: true });
      const regData = response.data?.data || response.data;
      set({
        registration: regData,
        travelDocuments: regData?.travel_documents || [],
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

  fetchUserStats: async () => {
    try {
      const response = await axios.get("/user/stats/", { useAuth: true });
      set({ userStats: response.data?.data || response.data });
    } catch (err) {
      console.error("Failed to fetch user stats:", err);
    }
  },

  registrationProgress: null,

  fetchRegistrationProgress: async () => {
    try {
      const response = await axios.get("/user/progress/", { useAuth: true });
      set({ registrationProgress: response.data?.data || response.data });
    } catch (err) {
      console.error("Failed to fetch registration progress:", err);
    }
  },

  manasikGuidance: [],
  emergencyContacts: [],

  fetchManasikGuidance: async () => {
    try {
      const response = await axios.get("/guidance/manasik/", { useAuth: true });
      set({ manasikGuidance: response.data?.data || response.data || [] });
    } catch (err) {
      console.error("Failed to fetch manasik guidance:", err);
    }
  },

  fetchEmergencyContacts: async () => {
    try {
      const response = await axios.get("/emergency/contacts/", { useAuth: true });
      set({ emergencyContacts: response.data?.data || response.data || [] });
    } catch (err) {
      console.error("Failed to fetch emergency contacts:", err);
    }
  },

  travelHistory: [],
  travelHistoryPagination: null,

  fetchTravelHistory: async (page = 1, pageSize = 10) => {
    try {
      const response = await axios.get(`/travel/history/?page=${page}&page_size=${pageSize}`, { useAuth: true });
      set({ 
        travelHistory: response.data?.data?.travel_history || response.data?.travel_history || [],
        travelHistoryPagination: response.data?.data?.pagination || response.data?.pagination || null
      });
    } catch (err) {
      console.error("Failed to fetch travel history:", err);
    }
  },

  cancelRegistration: async (registrationId) => {
    try {
      const response = await axios.post(`/admin/registration/${registrationId}/cancel/`, {}, { useAuth: true });
      return response;
    } catch (err) {
      return err.response || { success: false, message: err.message };
    }
  },

  fetchTravelDocuments: async () => {
    try {
      const response = await axios.get("/hajj/travel-documents/", { useAuth: true });
      set({ travelDocuments: response.data || [] });
    } catch (err) {
      console.error("Failed to fetch travel documents:", err);
    }
  },

  fetchSupportTickets: async () => {
    try {
      const response = await axios.get("/support/tickets/", { useAuth: true });
      set({ supportTickets: response.data || [] });
    } catch (err) {
      console.error("Failed to fetch support tickets:", err);
    }
  },

  createSupportTicket: async (data) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.post("/support/tickets/create/", data, { useAuth: true });
      
      if (res.success) {
        set((state) => ({ 
          supportTickets: [res.data, ...state.supportTickets],
          error: null 
        }));
        toast.success(res.message || "Support ticket created!");
        return true;
      } else {
        set({ error: res.errors || ["Failed to create ticket"] });
        toast.error(res.message || "Failed to create ticket");
        return false;
      }
    } catch (err) {
      set({ error: err.errors || ["Failed to create ticket"] });
      toast.error(err.message || "Failed to create ticket");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  replyToTicket: async (ticketId, message) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.post(`/support/tickets/${ticketId}/reply/`, { message }, { useAuth: true });
      
      if (res.success) {
        await get().fetchSupportTickets();
        toast.success(res.message || "Reply added!");
        return true;
      } else {
        set({ error: res.errors || ["Failed to add reply"] });
        toast.error(res.message || "Failed to add reply");
        return false;
      }
    } catch (err) {
      set({ error: err.errors || ["Failed to add reply"] });
      toast.error(err.message || "Failed to add reply");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  refreshRegistration: async () => {
    set({ loading: true, error: null, hasFetched: false });
    await get().fetchMyRegistration();
    await get().fetchUserStats();
  },

  submitAccountSetup: async (data) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.post("/hajj/step/account-setup/", data, { useAuth: true });
      
      if (res.success) {
        set({ registration: res.data, error: null });
        toast.success(res.message || "Account setup completed!");
        return true;
      } else {
        set({ error: res.errors || ["Account setup failed"] });
        toast.error(res.message || "Account setup failed");
        return false;
      }
    } catch (err) {
      set({ error: err.errors || ["Account setup failed"] });
      toast.error(err.message || "Account setup failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  submitRegistrationForm: async (formData) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.patch("/hajj/step/registration-form/", formData, {
        useAuth: true,
      });

      if (res.success) {
        set({ registration: res.data, error: null });
        toast.success(res.message || "Registration form submitted!");
        return true;
      } else {
        set({ error: res.errors || ["Registration form submission failed"] });
        toast.error(res.message || "Registration form submission failed");
        return false;
      }
    } catch (err) {
      set({ error: err.errors || ["Registration form submission failed"] });
      toast.error(err.message || "Registration form submission failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  fetchRegistrationFormData: async () => {
    try {
      const res = await axios.get("/hajj/step/registration-form/", { useAuth: true });
      if (res.success && res.data) {
        return res.data;
      }
      return null;
    } catch (err) {
      console.error("Failed to fetch registration form data:", err);
      return null;
    }
  },

  submitDocumentUpload: async (formData) => {
    set({ loading: true, error: null });

    try {
      const res = await axios.post("/hajj/step/document-upload/", formData, {
        useAuth: true,
      });

      if (res.success) {
        set({ registration: res.data, error: null });
        toast.success(res.message || "Documents uploaded successfully!");
        return true;
      } else {
        set({ error: res.errors || ["Document upload failed"] });
        toast.error(res.message || "Document upload failed");
        return false;
      }
    } catch (err) {
      set({ error: err.errors || ["Document upload failed"] });
      toast.error(err.message || "Document upload failed");
      return false;
    } finally {
      set({ loading: false });
    }
  },

  clear: () => {
    set({
      registration: null,
      travelDocuments: [],
      supportTickets: [],
      loading: false,
      error: null,
      hasFetched: false,
    });
  },

  // Bank Accounts
  bankAccounts: [],
  fetchBankAccounts: async () => {
    try {
      const response = await axios.get("/accounts/", { useAuth: true });
      const accounts = response.data?.bank_accounts || response.data?.data || [];
      set({ bankAccounts: accounts });
      return accounts;
    } catch (err) {
      console.error("Failed to fetch bank accounts:", err);
      return [];
    }
  },

  uploadPaymentProof: async (formData) => {
    set({ loading: true });
    try {
      const response = await axios.post("/payments/user/upload/", formData, {
        useAuth: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Payment proof uploaded successfully!");
      return response.data;
    } catch (err) {
      toast.error(err.message || "Payment proof upload failed");
      return null;
    } finally {
      set({ loading: false });
    }
  },

  startNewRegistration: async (packageId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post("/registration/start/", { package_id: packageId }, { useAuth: true });
      const regData = response.data?.data || response.data;
      set({ registration: regData, loading: false });
      toast.success("New registration started!");
      return regData;
    } catch (err) {
      set({ loading: false, error: err.message || "Failed to start new registration" });
      toast.error(err.message || "Failed to start new registration");
      return null;
    }
  },

  // Support Tickets
  tickets: [],
  fetchTickets: async () => {
    try {
      const response = await axios.get("/support/tickets/", { useAuth: true });
      set({ tickets: response.data?.data || response.data || [] });
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    }
  },

  createTicket: async (data) => {
    set({ loading: true });
    try {
      const response = await axios.post("/support/tickets/create/", data, { useAuth: true });
      const ticket = response.data?.data || response.data;
      set((state) => ({ 
        tickets: [ticket, ...state.tickets], 
        loading: false 
      }));
      toast.success("Ticket created successfully!");
      return ticket;
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },
}));

export default useDashboardStore;
