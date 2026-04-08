import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useDashboardStore from "../../store/dashboard.store";
import useAuthStore from "../../store/store";
import { toast } from "react-hot-toast";
import UserActivities from "./UserActivities";
import TravelHistory from "./TravelHistory";
import RegistrationProgress from "./RegistrationProgress";
import {
  DashboardHeader,
  RegistrationForm,
  AccountSetupForm,
  UnderReviewSection,
  DocumentUploadForm,
  CurrentJourneyDetailsSection,
  JourneyItinerarySection,
  ManasikGuidanceSection,
  EmergencyContactSection,
} from "./dashboardComponents";
import PaymentStepForm from "./PaymentStepForm";
import SupportTicketForm from "./SupportTicketForm";

// ────────────────────────────────────────────────
// MAIN DASHBOARD COMPONENT
// ────────────────────────────────────────────────
const TravelDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, checkingAuth, checkAuth } = useAuthStore();
  const {
    registration,
    loading: storeLoading,
    error,
    fetchMyRegistration,
    refreshRegistration,
    submitAccountSetup,
    submitRegistrationForm,
    submitDocumentUpload,
    fetchUserStats,
    userStats,
    manasikGuidance,
    emergencyContacts,
    fetchManasikGuidance,
    fetchEmergencyContacts,
    uploadPaymentProof,
    fetchTickets,
  } = useDashboardStore();

  const lazyLoadRef = useRef({ manasik: false, support: false });
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [formDataStep2, setFormDataStep2] = useState({
    email: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    nationality: "",
    state_of_origin: "",
    passport_number: "",
    passport_expiry: "",
    address: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);

  const [passportFile, setPassportFile] = useState(null);
  const [yellowCardFile, setYellowCardFile] = useState(null);

  const [forceShowForm, setForceShowForm] = useState(false);

  const progressRef = useRef(null);

  const currentYear = new Date().getFullYear();

const getActiveTabFromPath = (pathname) => {
  if (pathname === "/dashboard" || pathname === "/dashboard/") return "status";
  if (pathname.includes("/dashboard/progress")) return "journey";
  if (pathname.includes("/dashboard/history")) return "history";
  if (pathname.includes("/dashboard/journey")) return "journey";
  if (pathname.includes("/dashboard/guidance")) return "manasik";
  if (pathname.includes("/dashboard/support")) return "support";
  return "status";
};

const getJourneyViewFromPath = (pathname) => {
  if (pathname.includes("/dashboard/journey/itinerary")) return "itinerary";
  if (pathname.includes("/dashboard/journey/documents")) return "documents";
  if (pathname.includes("/dashboard/journey/accommodation")) return "accommodation";
  return "overview";
};

  const activeTabFromPath = getActiveTabFromPath(location.pathname);
  const journeyView = getJourneyViewFromPath(location.pathname);
  const [activeTab, setActiveTab] = useState(activeTabFromPath);

  useEffect(() => {
    setActiveTab(activeTabFromPath);
  }, [activeTabFromPath]);

  const tabs = [
    { id: "status", label: "Overview", icon: "📋" },
    { id: "history", label: "History", icon: "📜" },
    { id: "journey", label: "Current Journey", icon: "✈️" },
    { id: "manasik", label: "Manasik Guide", icon: "📖" },
    { id: "support", label: "Support", icon: "💬" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "history":
        return <TravelHistory />;
      case "journey":
        if (journeyView === "itinerary") {
          return <JourneyItinerarySection registration={registration} />;
        }
        if (journeyView === "documents") {
          return <CurrentJourneyDetailsSection registration={registration} />;
        }
        return <RegistrationProgress />;
      case "manasik":
        return <ManasikGuidanceSection guidance={manasikGuidance} />;
      case "support":
        if (location.pathname.includes("/emergency")) {
          return <EmergencyContactSection contacts={emergencyContacts} />;
        }
        return <SupportTicketForm />;
      default:
        return null;
    }
  };

  useEffect(() => { checkAuth(); }, [checkAuth]);
  useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);
  useEffect(() => { 
    if (user) {
      fetchMyRegistration();
      fetchUserStats();
    }
  }, [user, fetchMyRegistration, fetchUserStats]);

  useEffect(() => {
    if (!user) return;
    if (activeTab === "manasik" && !lazyLoadRef.current.manasik) {
      fetchManasikGuidance();
      lazyLoadRef.current.manasik = true;
    }
    if (activeTab === "support") {
      fetchEmergencyContacts();
      if (!location.pathname.includes("/emergency")) {
        fetchTickets();
      }
      lazyLoadRef.current.support = true;
    }
  }, [activeTab, user, fetchManasikGuidance, fetchEmergencyContacts, fetchTickets, location.pathname]);

  useEffect(() => {
    if (registration?.current_step?.code === "account_setup") {
      setShowChangeCredentialsModal(true);
    }
  }, [registration]);

  useEffect(() => {
    if (error) {
      if (Array.isArray(error)) error.forEach(err => toast.error(err));
      else if (typeof error === "string") toast.error(error);
    }
  }, [error]);

  const handleStartOver = useCallback(() => {
    setFormDataStep2({
      email: "",
      first_name: "",
      last_name: "",
      date_of_birth: "",
      gender: "",
      nationality: "",
      state_of_origin: "",
      passport_number: "",
      passport_expiry: "",
      address: "",
      emergency_contact_name: "",
      emergency_contact_phone: "",
    });
    setProfilePicture(null);
    setPassportFile(null);
    setYellowCardFile(null);
    setForceShowForm(true);
  }, []);

  const handleCheckForUpdates = async () => {
    progressRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    await refreshRegistration();
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match");

    const payload = { password: newPassword, password_confirm: confirmPassword };
    if (newUsername.trim()) payload.username = newUsername.trim();

    const success = await submitAccountSetup(payload);
    if (success) {
      setShowChangeCredentialsModal(false);
      setNewUsername("");
      setNewPassword("");
      setConfirmPassword("");
      await refreshRegistration();
    }
  };

  const handleStep2Change = (e) => {
    const { name, value } = e.target;
    setFormDataStep2(prev => ({ ...prev, [name]: value }));
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    if (!profilePicture) return toast.error("Profile picture is required");

    const payload = new FormData();
    Object.entries(formDataStep2).forEach(([k, v]) => payload.append(k, v));
    payload.append("profile_picture", profilePicture);

    const success = await submitRegistrationForm(payload);
    if (success) {
      setProfilePicture(null);
      setForceShowForm(false);
      await refreshRegistration();
    }
  };

  const handleStep3Submit = async (e) => {
    e.preventDefault();
    if (!passportFile || !yellowCardFile) return toast.error("Both documents are required");

    const payload = new FormData();
    payload.append("passport", passportFile);
    payload.append("yellow_card", yellowCardFile);

    const success = await submitDocumentUpload(payload);
    if (success) {
      setPassportFile(null);
      setYellowCardFile(null);
      setForceShowForm(false);
      await refreshRegistration();
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (!user) return null;

  const registrationStatus = registration?.status;
  const currentStepCode = registration?.current_step?.code;
  const rejectionReason = registration?.current_step_rejection_reason || "";

  const isRejected = registrationStatus === "failed" && rejectionReason;
  const isUnderReview = !isRejected && (registrationStatus === "pending" ||
    ["registration_form", "document_upload", "document_review"].includes(currentStepCode));

  const canEditStep = (code) => {
    if (forceShowForm) return true;
    return currentStepCode === code;
  };

  const renderStepForms = () => (
    <>
      {canEditStep("account_setup") && (
        <AccountSetupForm
          onSubmit={handleStep1Submit}
          newUsername={newUsername}
          setNewUsername={setNewUsername}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          loading={storeLoading}
        />
      )}

      {canEditStep("payment_details") && (
        <PaymentStepForm
          onSubmit={uploadPaymentProof}
          loading={storeLoading}
        />
      )}

      {canEditStep("registration_form") && (
        <RegistrationForm
          formData={formDataStep2}
          onChange={handleStep2Change}
          profilePicture={profilePicture}
          setProfilePicture={setProfilePicture}
          onSubmit={handleStep2Submit}
          loading={storeLoading}
        />
      )}

      {canEditStep("document_upload") && (
        <DocumentUploadForm
          passportFile={passportFile}
          setPassportFile={setPassportFile}
          yellowCardFile={yellowCardFile}
          setYellowCardFile={setYellowCardFile}
          onSubmit={handleStep3Submit}
          loading={storeLoading}
        />
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <DashboardHeader user={user} currentYear={currentYear} />

      <div className="max-w-6xl mx-auto mt-4 px-2">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b overflow-x-auto">
            <nav className="flex space-x-1 p-2 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition ${
                    activeTab === tab.id
                      ? "bg-emerald-600 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {storeLoading && !registration ? (
              <div className="flex flex-col items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
                <p className="mt-4 text-gray-500">Retrieving application status...</p>
              </div>
            ) : activeTab === "status" ? (
              <div ref={progressRef}>
                {/* Show User Activities/Overview */}
                <div className="mb-8">
                  <UserActivities 
                    user={user} 
                    registration={registration}
                    userStats={userStats} 
                  />
                </div>
                
                {isUnderReview && (
                  <UnderReviewSection
                    title={registration?.current_step?.title || "Application Under Review"}
                    onCheckUpdates={handleCheckForUpdates}
                  />
                )}
              </div>
            ) : (
              renderTabContent()
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelDashboard;
