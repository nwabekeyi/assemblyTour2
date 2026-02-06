import InputField from "../../common/inputField";
import Modal from "../sharedComponents/Modal";
import FileUploader from "../../common/fileUploader";
import { motion } from "framer-motion";


export const DashboardHeader = ({ user, currentYear }) => (
    <header className="bg-white border-b px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-emerald-800">Assembly Travels</h1>
          <p className="text-xs text-gray-500">Hajj Portal {currentYear}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-900">{user.username || "Traveler"}</p>
            <p className="text-xs text-gray-500">{user.phone}</p>
          </div>
          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white text-lg">
            🕋
          </div>
        </div>
      </div>
    </header>
  );

  // ────────────────────────────────────────────────
// UNDER REVIEW SECTION
// ────────────────────────────────────────────────
export const UnderReviewSection = ({ title, onCheckUpdates }) => (
    <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
      <div className="text-5xl mb-4 text-emerald-600">🕋</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title || "Application Under Review"}</h2>
      <p className="text-gray-500 max-w-md mx-auto">
        Our team is currently reviewing your Hajj registration. You will be notified once the next step is available. Thank you for your patience.
      </p>
  
      <div className="mt-10 pt-10 border-t flex justify-center gap-4">
        <button
          onClick={onCheckUpdates}
          className="px-6 py-2 border-2 border-emerald-600 text-emerald-600 rounded-full font-bold hover:bg-emerald-50 transition"
        >
          Check for Updates
        </button>
      </div>
    </div>
  );
  
  // ────────────────────────────────────────────────
  // STEP 1: ACCOUNT SETUP FORM
  // ────────────────────────────────────────────────
  export const AccountSetupForm = ({ onSubmit, newUsername, setNewUsername, newPassword, setNewPassword, confirmPassword, setConfirmPassword, loading }) => (
    <Modal isOpen={true} onClose={() => {}}>
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Secure Your Account</h2>
        <p className="text-gray-500 mb-8">Create a password to secure your travel portal. Username is optional.</p>
  
        <form onSubmit={onSubmit} className="space-y-5">
          <InputField
            label="Username (optional)"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Choose a username"
          />
          <InputField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <InputField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition mt-3"
          >
            {loading ? "Updating..." : "Update Credentials"}
          </button>
        </form>
      </div>
    </Modal>
  );
  
  // ────────────────────────────────────────────────
  // STEP 2: REGISTRATION FORM
  // ────────────────────────────────────────────────
  export const RegistrationForm = ({ formData, onChange, profilePicture, setProfilePicture, onSubmit, loading }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Registrations</h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(formData).map(([key, value]) => (
            <InputField
              key={key}
              label={key.replace(/_/g, " ")}
              name={key}
              type={key.includes("date") || key.includes("expiry") ? "date" : "text"}
              value={value}
              onChange={onChange}
              required
              className={key === "address" ? "md:col-span-2" : ""}
              as={key === "address" ? "textarea" : key === "gender" ? "select" : "input"}
            >
              {key === "gender" && (
                <>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </>
              )}
            </InputField>
          ))}
        </div>
  
        <FileUploader
          label="Profile Picture (Clear background) *"
          selectedFile={profilePicture}
          onFileSelect={setProfilePicture}
        />
  
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 disabled:opacity-50 transition mt-4"
        >
          {loading ? "Processing..." : "Save Bio-Data"}
        </button>
      </form>
    </motion.div>
  );

export const DocumentUploadForm = ({ passportFile, setPassportFile, yellowCardFile, setYellowCardFile, onSubmit, loading }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100"
  >
    <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload All Documents</h2>
    <p className="text-gray-500 mb-8">Please provide clear scans of your travel documents.</p>

    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUploader
          label="International Passport *"
          selectedFile={passportFile}
          onFileSelect={setPassportFile}
          accept={{ "image/*": [], "application/pdf": [] }}
        />
        <FileUploader
          label="Yellow Fever Card *"
          selectedFile={yellowCardFile}
          onFileSelect={setYellowCardFile}
          accept={{ "image/*": [], "application/pdf": [] }}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 disabled:opacity-50 transition"
      >
        {loading ? "Uploading..." : "Complete Submission"}
      </button>
    </form>
  </motion.div>
);