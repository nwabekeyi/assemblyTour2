import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useDashboardStore from "../../store/dashboard.store";
import useAuthStore from "../../store/store";
import { toast } from "react-hot-toast";
import StepProgress from "./stepProgress";
import {
  DashboardHeader,
  RegistrationForm,
  AccountSetupForm,
  UnderReviewSection,
  DocumentUploadForm
} from "./dashboardComponents";

// ────────────────────────────────────────────────
// MAIN DASHBOARD COMPONENT
// ────────────────────────────────────────────────
const TravelDashboard = () => {
  const navigate = useNavigate();
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
  } = useDashboardStore();

  const [showChangeCredentialsModal, setShowChangeCredentialsModal] = useState(false);
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

  useEffect(() => { checkAuth(); }, [checkAuth]);
  useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);
  useEffect(() => { if (user) fetchMyRegistration(); }, [user, fetchMyRegistration]);

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
    !["account_setup", "registration_form", "document_upload"].includes(currentStepCode));

  const showForm = !isUnderReview || forceShowForm;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <DashboardHeader user={user} currentYear={currentYear} />

      <main className="max-w-4xl mx-auto mt-8 px-4">
        {storeLoading && !registration ? (
          <div className="flex flex-col items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
            <p className="mt-4 text-gray-500">Retrieving application status...</p>
          </div>
        ) : (
          <>
            {registration && (
              <div ref={progressRef}>
                <StepProgress
                  allSteps={registration.all_steps || []}
                  completedSteps={registration.completed_steps || []}
                  currentStep={registration.current_step}
                  registrationStatus={registrationStatus}
                  currentStepRejectionReason={rejectionReason}
                  onStartOver={handleStartOver}
                />
              </div>
            )}

            {currentStepCode === "account_setup" && showForm && (
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

            {currentStepCode === "registration_form" && showForm && (
              <RegistrationForm
                formData={formDataStep2}
                onChange={handleStep2Change}
                profilePicture={profilePicture}
                setProfilePicture={setProfilePicture}
                onSubmit={handleStep2Submit}
                loading={storeLoading}
              />
            )}

            {currentStepCode === "document_upload" && showForm && (
              <DocumentUploadForm
                passportFile={passportFile}
                setPassportFile={setPassportFile}
                yellowCardFile={yellowCardFile}
                setYellowCardFile={setYellowCardFile}
                onSubmit={handleStep3Submit}
                loading={storeLoading}
              />
            )}

            {isUnderReview && (
              <UnderReviewSection
                title={registration?.current_step?.title || "Application Under Review"}
                onCheckUpdates={handleCheckForUpdates}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default TravelDashboard;