import InputField from "../../common/inputField";
import Modal from "../sharedComponents/Modal";
import FileUploader from "../../common/fileUploader";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, AlertTriangle, CheckCircle2, Circle, Clock, Plane, MapPin } from "lucide-react";

export const DashboardHeader = ({ user, currentYear }) => (
  <header className="bg-white border-b px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div>
        <h1 className="text-xl font-bold text-emerald-800">Assembly Travels</h1>
        <p className="text-xs text-gray-500">Travel Portal {currentYear}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-900">{user.username || "Traveler"}</p>
          <p className="text-xs text-gray-500">{user.phone}</p>
        </div>
        <img src={user.profile_picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || "Traveler")}&background=10B981&color=fff&size=128`} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
      </div>
    </div>
  </header>
);

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

export const RegistrationForm = ({ formData, onChange, profilePicture, setProfilePicture, onSubmit, loading }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100"
  >
    <h2 className="text-2xl font-bold text-gray-800 mb-6">Complete Registration</h2>
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(formData).map(([key, value]) => (
          <InputField
            key={key}
            label={key.replace(/_/g, " ")}
            name={key}
            type={key.includes("date") || key.includes("expiry") ? "date" : key === "phone_number" ? "tel" : "text"}
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
    <p className="text-gray-500">Please provide clear scans of the required travel documents. These files go straight to our admin team for verification.</p>
    <ul className="mt-4 mb-8 space-y-2 text-sm text-gray-600 list-disc list-inside bg-emerald-50 border border-emerald-100 rounded-xl p-4">
      <li><span className="font-semibold text-gray-800">International Passport:</span> Upload the bio-data page showing your photo and passport details.</li>
      <li><span className="font-semibold text-gray-800">Yellow Fever Card:</span> Upload the full card showing vaccination details.</li>
    </ul>
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

export const CurrentJourneyDetailsSection = ({ registration }) => {
  const travelDocuments = registration?.travel_documents || [];
  const packageName = registration?.package?.name;
  const status = registration?.status;
  const visaStatus = registration?.visa_status || "pending";
  const visaStatusNotes = registration?.visa_status_notes;
  const journeyPresenceStatus = registration?.journey_presence_status || "pre_travel";
  const journeyPresenceNotes = registration?.journey_presence_notes;

  const visaStatusMeta = {
    pending: {
      label: "Pending",
      description: "Our immigration team is still processing your visa.",
      badgeClass: "bg-amber-100 text-amber-700",
      cardClass: "border-amber-100 bg-amber-50",
    },
    ready: {
      label: "Ready",
      description: "Visa is approved. We are preparing your travel documents.",
      badgeClass: "bg-emerald-100 text-emerald-700",
      cardClass: "border-emerald-100 bg-emerald-50",
    },
    failed: {
      label: "Failed",
      description: "Unfortunately, this visa request was declined.",
      badgeClass: "bg-red-100 text-red-700",
      cardClass: "border-red-100 bg-red-50",
    },
  };
  const visaMeta = visaStatusMeta[visaStatus] || visaStatusMeta.pending;

  const personalDocs = [
    {
      key: "passport",
      label: "International Passport (bio data page)",
      url: registration?.passport_document,
    },
    {
      key: "yellow_card",
      label: "Yellow Fever Card",
      url: registration?.yellow_card_document,
    },
  ];

  const requiredTravelDocs = [
    { type: "visa", label: "Visa Approval" },
    { type: "ticket", label: "Flight Ticket" },
    { type: "hotel_voucher", label: "Hotel Voucher" },
  ];

  const uploadedTravelDocTypes = new Set(travelDocuments.map((doc) => doc.doc_type));
  const pendingTravelDocLabels = requiredTravelDocs
    .filter((doc) => !uploadedTravelDocTypes.has(doc.type))
    .map((doc) => doc.label);

  const arrivalStatusMeta = {
    pre_travel: {
      label: "Awaiting Travel",
      description: "We’ll update this once you depart for Mecca.",
      badgeClass: "bg-gray-100 text-gray-700",
      cardClass: "border-gray-200 bg-gray-50",
    },
    in_mecca: {
      label: "In Mecca",
      description: "Our field team has confirmed your arrival in Mecca.",
      badgeClass: "bg-blue-100 text-blue-700",
      cardClass: "border-blue-100 bg-blue-50",
    },
    arrived: {
      label: "Arrived Home",
      description: "Welcome back! Your journey is officially complete.",
      badgeClass: "bg-emerald-100 text-emerald-700",
      cardClass: "border-emerald-100 bg-emerald-50",
    },
    did_not_arrive: {
      label: "Did Not Arrive",
      description: "An incident occurred during your journey.",
      badgeClass: "bg-red-100 text-red-700",
      cardClass: "border-red-100 bg-red-50",
    },
  };
  const arrivalMeta = arrivalStatusMeta[journeyPresenceStatus] || arrivalStatusMeta.pre_travel;

  const arrivalStatusLabel = {
    pre_travel: "Awaiting Travel",
    in_mecca: "In Mecca",
    arrived: "Completed",
    did_not_arrive: "Did Not Arrive",
  }[journeyPresenceStatus] || "Awaiting Travel";

  const sectionNav = [
    { id: "journey-visa-status", label: "Visa Status" },
    { id: "journey-travel-docs", label: "Travel Docs (Step 6)" },
    { id: "journey-arrival-status", label: "Arrival Status (Step 7)" },
    { id: "journey-personal-docs", label: "Personal Docs" },
    { id: "journey-logistics", label: "Logistics" },
  ];

  const scrollToSection = (id) => {
    if (typeof window === "undefined") return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const getDocTypeLabel = (type) => {
    const labels = {
      visa: "Visa",
      ticket: "Flight Ticket",
      hotel_voucher: "Hotel Voucher",
      passport: "Passport",
      yellow_card: "Yellow Card",
      other: "Other",
    };
    return labels[type] || type;
  };

  if (!registration) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
        <div className="text-4xl mb-4">🧭</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Current Journey Details</h2>
        <p className="text-gray-500">Start or select a registration to see your active journey documents.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Current Journey</p>
          <h2 className="text-2xl font-bold text-gray-800">{packageName || "Awaiting Assignment"}</h2>
          <p className="text-sm text-gray-500">Only documents for this active journey are shown below.</p>
        </div>
        <div className={`px-4 py-2 rounded-full text-sm font-semibold ${status === "completed" ? "bg-emerald-100 text-emerald-700" : status === "pending" ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600"}`}>
          {status ? status.toUpperCase() : "NO STATUS"}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {sectionNav.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="px-4 py-2 text-sm font-medium rounded-full border border-gray-200 text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition"
          >
            {item.label}
          </button>
        ))}
      </div>

      <section id="journey-visa-status" className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Step 5 – Visa Status</h3>
        <div className={`p-5 rounded-2xl border ${visaMeta.cardClass}`}>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${visaMeta.badgeClass}`}>
              {visaMeta.label}
            </span>
            <p className="text-sm text-gray-500">
              Updated {registration?.updated_at ? new Date(registration.updated_at).toLocaleDateString() : "recently"}
            </p>
          </div>
          <p className="mt-3 text-sm text-gray-700">{visaMeta.description}</p>
          {visaStatusNotes && (
            <div className="mt-3 p-3 bg-white/80 rounded-lg border border-gray-100 text-sm text-gray-700">
              {visaStatusNotes}
            </div>
          )}
          {visaStatus === "failed" && (
            <p className="mt-3 text-sm text-red-600 font-semibold">
              Contact support to re-initiate registration if needed.
            </p>
          )}
        </div>
      </section>

      <section id="journey-travel-docs" className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Step 6 – Travel Documents</h3>
          {pendingTravelDocLabels.length > 0 && (
            <span className="text-xs px-3 py-1 rounded-full bg-amber-100 text-amber-700 font-semibold">
              {pendingTravelDocLabels.length} pending
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {requiredTravelDocs.map((req) => {
            const matched = travelDocuments.find((doc) => doc.doc_type === req.type);
            const isDone = Boolean(matched);
            return (
              <div key={req.type} className={`p-4 border rounded-xl ${isDone ? "border-emerald-100 bg-emerald-50" : "border-gray-200"}`}>
                <div className="flex items-center gap-2 mb-1">
                  {isDone ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <Circle className="w-5 h-5 text-gray-400" />}
                  <p className="font-semibold text-gray-800">{req.label}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {isDone ? "Ready to download" : "Our admin team is preparing this document"}
                </p>
              </div>
            );
          })}
        </div>

        {pendingTravelDocLabels.length > 0 && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-100 rounded-xl">
            <p className="text-sm text-amber-800 font-medium">Pending from admin:</p>
            <ul className="list-disc list-inside text-sm text-amber-700">
              {pendingTravelDocLabels.map((label) => <li key={label}>{label}</li>)}
            </ul>
            <p className="text-xs text-amber-700 mt-2">You will receive an SMS and email once these are uploaded.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {travelDocuments.length > 0 ? (
            travelDocuments.map((doc) => (
              <div key={doc.id} className="border rounded-lg p-4 hover:shadow-md transition">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded">
                    {getDocTypeLabel(doc.doc_type)}
                  </span>
                  <span className="text-xs text-gray-400">
                    {(doc.updated_at || doc.uploaded_at)
                      ? new Date(doc.updated_at || doc.uploaded_at).toLocaleDateString()
                      : "New"}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{doc.title}</h3>
                {doc.description && <p className="text-sm text-gray-500 mb-3">{doc.description}</p>}
                
                {/* Display visa details */}
                {doc.doc_type === 'visa' && (
                  <div className="bg-blue-50 p-3 rounded-lg mb-3 text-sm">
                    <p className="font-semibold text-blue-800 mb-2">Visa Details</p>
                    <div className="grid grid-cols-2 gap-2">
                      {doc.visa_number && <p><span className="text-gray-500">Visa No:</span> <span className="font-medium">{doc.visa_number}</span></p>}
                      {doc.visa_type && <p><span className="text-gray-500">Type:</span> <span className="font-medium">{doc.visa_type}</span></p>}
                      {doc.visa_country && <p><span className="text-gray-500">Country:</span> <span className="font-medium">{doc.visa_country}</span></p>}
                      {doc.visa_port_of_entry && <p><span className="text-gray-500">Port of Entry:</span> <span className="font-medium">{doc.visa_port_of_entry}</span></p>}
                      {doc.visa_issue_date && <p><span className="text-gray-500">Issued:</span> <span className="font-medium">{new Date(doc.visa_issue_date).toLocaleDateString()}</span></p>}
                      {doc.visa_expiry_date && <p><span className="text-gray-500">Expires:</span> <span className="font-medium">{new Date(doc.visa_expiry_date).toLocaleDateString()}</span></p>}
                    </div>
                  </div>
                )}
                
                {/* Display flight/ticket details */}
                {doc.doc_type === 'ticket' && (
                  <div className="bg-purple-50 p-3 rounded-lg mb-3 text-sm">
                    <p className="font-semibold text-purple-800 mb-2">Flight Details</p>
                    <div className="grid grid-cols-2 gap-2">
                      {doc.airline_name && <p><span className="text-gray-500">Airline:</span> <span className="font-medium">{doc.airline_name}</span></p>}
                      {doc.flight_number && <p><span className="text-gray-500">Flight No:</span> <span className="font-medium">{doc.flight_number}</span></p>}
                      {doc.seat_number && <p><span className="text-gray-500">Seat:</span> <span className="font-medium">{doc.seat_number}</span></p>}
                      {doc.booking_reference && <p><span className="text-gray-500">Booking Ref:</span> <span className="font-medium">{doc.booking_reference}</span></p>}
                      {doc.departure_airport && <p><span className="text-gray-500">From:</span> <span className="font-medium">{doc.departure_airport}</span></p>}
                      {doc.arrival_airport && <p><span className="text-gray-500">To:</span> <span className="font-medium">{doc.arrival_airport}</span></p>}
                      {doc.departure_date && <p><span className="text-gray-500">Departure:</span> <span className="font-medium">{new Date(doc.departure_date).toLocaleDateString()}</span></p>}
                      {doc.arrival_date && <p><span className="text-gray-500">Arrival:</span> <span className="font-medium">{new Date(doc.arrival_date).toLocaleDateString()}</span></p>}
                    </div>
                  </div>
                )}
                
                {/* Display hotel details */}
                {doc.doc_type === 'hotel_voucher' && (
                  <div className="bg-amber-50 p-3 rounded-lg mb-3 text-sm">
                    <p className="font-semibold text-amber-800 mb-2">Hotel Details</p>
                    <div className="space-y-1">
                      {doc.hotel_name && <p><span className="text-gray-500">Hotel:</span> <span className="font-medium">{doc.hotel_name}</span></p>}
                      {doc.hotel_address && <p><span className="text-gray-500">Address:</span> <span className="font-medium">{doc.hotel_address}</span></p>}
                      {doc.room_type && <p><span className="text-gray-500">Room Type:</span> <span className="font-medium">{doc.room_type}</span></p>}
                      {doc.room_number && <p><span className="text-gray-500">Room No:</span> <span className="font-medium">{doc.room_number}</span></p>}
                      {doc.number_of_nights && <p><span className="text-gray-500">Nights:</span> <span className="font-medium">{doc.number_of_nights}</span></p>}
                      {doc.check_in_date && <p><span className="text-gray-500">Check-in:</span> <span className="font-medium">{new Date(doc.check_in_date).toLocaleDateString()}</span></p>}
                      {doc.check_out_date && <p><span className="text-gray-500">Check-out:</span> <span className="font-medium">{new Date(doc.check_out_date).toLocaleDateString()}</span></p>}
                    </div>
                  </div>
                )}
                
                <a
                  href={doc.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  📎 View Document
                </a>
              </div>
            ))
          ) : (
            <div className="col-span-full border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
              <p className="text-gray-500">No travel documents have been issued yet.</p>
            </div>
          )}
        </div>
      </section>

      <section id="journey-arrival-status" className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Step 7 – Arrival Status</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${arrivalMeta.badgeClass}`}>
            {arrivalStatusLabel}
          </span>
        </div>
        <div className={`p-5 rounded-2xl border ${arrivalMeta.cardClass}`}>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${arrivalMeta.badgeClass}`}>
              {arrivalMeta.label}
            </span>
            <p className="text-sm text-gray-500">
              Recorded {registration?.updated_at ? new Date(registration.updated_at).toLocaleDateString() : "recently"}
            </p>
          </div>
          <p className="mt-3 text-sm text-gray-700">{arrivalMeta.description}</p>
          {journeyPresenceNotes && (
            <div className="mt-3 p-3 bg-white/80 rounded-lg border border-gray-100 text-sm text-gray-700">
              {journeyPresenceNotes}
            </div>
          )}
          {journeyPresenceStatus === "did_not_arrive" && (
            <p className="mt-3 text-sm text-red-600 font-semibold">Our support team will reach out with the next steps.</p>
          )}
        </div>
      </section>

      <section id="journey-personal-docs" className="mb-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Document Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personalDocs.map((doc) => {
            const isUploaded = Boolean(doc.url);
            return (
              <div key={doc.key} className={`flex items-center gap-4 p-4 rounded-xl border ${isUploaded ? "border-emerald-100 bg-emerald-50" : "border-amber-100 bg-amber-50"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isUploaded ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"}`}>
                  {isUploaded ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{doc.label}</p>
                  <p className="text-sm text-gray-500">{isUploaded ? "Received" : "Waiting for upload"}</p>
                </div>
                {isUploaded && (
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-emerald-600 text-sm font-semibold">
                    View
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
};

export const JourneyItinerarySection = ({ registration }) => {
  const travelDocs = registration?.travel_documents || [];
  const ticketDoc = travelDocs.find(d => d.doc_type === 'ticket');
  const hotelDoc = travelDocs.find(d => d.doc_type === 'hotel_voucher');
  
  const ticket = ticketDoc || {};
  const hotel = hotelDoc || {};
  const hasTicket = ticket && (ticket.airline_name || ticket.flight_number);
  const hasHotel = hotel && (hotel.hotel_name || hotel.room_type);

  if (!registration) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
        <div className="text-4xl mb-4">✈️</div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Flight & Hotel</h2>
        <p className="text-gray-500">Select a journey to view your travel details.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600">
          <Plane className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Travel Details</p>
          <h2 className="text-2xl font-bold text-gray-800">Flight & Hotel</h2>
        </div>
      </div>

      {hasTicket ? (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Plane className="w-4 h-4 text-blue-600" />
            <h3 className="font-semibold text-gray-800">Flight</h3>
          </div>
          <div className="p-4 border rounded-xl bg-blue-50 border-blue-100">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {ticket.airline_name && <p><span className="text-blue-700">Airline:</span> <span className="font-medium text-blue-900">{ticket.airline_name}</span></p>}
              {ticket.flight_number && <p><span className="text-blue-700">Flight No:</span> <span className="font-medium text-blue-900">{ticket.flight_number}</span></p>}
              {ticket.departure_airport && <p><span className="text-blue-700">From:</span> <span className="font-medium text-blue-900">{ticket.departure_airport}</span></p>}
              {ticket.arrival_airport && <p><span className="text-blue-700">To:</span> <span className="font-medium text-blue-900">{ticket.arrival_airport}</span></p>}
              {ticket.departure_date && <p><span className="text-blue-700">Departure:</span> <span className="font-medium text-blue-900">{ticket.departure_date}</span></p>}
              {ticket.arrival_date && <p><span className="text-blue-700">Arrival:</span> <span className="font-medium text-blue-900">{ticket.arrival_date}</span></p>}
              {ticket.seat_number && <p><span className="text-blue-700">Seat:</span> <span className="font-medium text-blue-900">{ticket.seat_number}</span></p>}
              {ticket.booking_reference && <p><span className="text-blue-700">Booking Ref:</span> <span className="font-medium text-blue-900">{ticket.booking_reference}</span></p>}
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6 border-2 border-dashed border-blue-200 rounded-xl p-6 text-center">
          <p className="text-blue-800 font-medium">Flight details pending</p>
        </div>
      )}

      {hasHotel ? (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-purple-600" />
            <h3 className="font-semibold text-gray-800">Hotel</h3>
          </div>
          <div className="p-4 border rounded-xl bg-purple-50 border-purple-100">
            <div className="grid grid-cols-2 gap-3 text-sm">
              {hotel.hotel_name && <p><span className="text-purple-700">Hotel:</span> <span className="font-medium text-purple-900">{hotel.hotel_name}</span></p>}
              {hotel.room_type && <p><span className="text-purple-700">Room Type:</span> <span className="font-medium text-purple-900">{hotel.room_type}</span></p>}
              {hotel.room_number && <p><span className="text-purple-700">Room No:</span> <span className="font-medium text-purple-900">{hotel.room_number}</span></p>}
              {hotel.check_in_date && <p><span className="text-purple-700">Check-in:</span> <span className="font-medium text-purple-900">{hotel.check_in_date}</span></p>}
              {hotel.check_out_date && <p><span className="text-purple-700">Check-out:</span> <span className="font-medium text-purple-900">{hotel.check_out_date}</span></p>}
              {hotel.number_of_nights && <p><span className="text-purple-700">Nights:</span> <span className="font-medium text-purple-900">{hotel.number_of_nights}</span></p>}
              {hotel.hotel_address && <p className="col-span-2"><span className="text-purple-700">Address:</span> <span className="font-medium text-purple-900">{hotel.hotel_address}</span></p>}
            </div>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-purple-200 rounded-xl p-6 text-center">
          <p className="text-purple-800 font-medium">Hotel details pending</p>
        </div>
      )}
    </motion.div>
  );
};

export const ManasikGuidanceSection = ({ guidance = [] }) => {
  const defaultContent = [
    { title: "What is Hajj?", icon: "🏛️", content: "Hajj is the annual Islamic pilgrimage to Mecca, Saudi Arabia. It is one of the Five Pillars of Islam." },
    { title: "Ihram", icon: "🧵", content: "Upon entering the state of Ihram, pilgrims enter a spiritual sanctuary with specific prohibitions." },
    { title: "Tawaf", icon: "☪️", content: "Pilgrims walk counter-clockwise seven times around the Ka'bah." },
    { title: "Sa'i", icon: "🚶", content: "Pilgrims walk seven times between Safa and Marwah hills." },
    { title: "Arafat", icon: "🕋", content: "On the ninth day, pilgrims gather at Mount Arafat for the pinnacle of Hajj." },
    { title: "Rami", icon: "🪨", content: "Pilgrims throw pebbles at the Jamrat al-Aqabah, symbolic of stoning the devil." },
    { title: "Qurbani", icon: "🐑", content: "After stoning, pilgrims perform sacrifice and distribute meat to the poor." },
    { title: "Tawaf al-Ifadah", icon: "🏃", content: "Final circumambulation of the Ka'bah before the end of Hajj." },
  ];

  const content = guidance && guidance.length > 0 ? guidance : defaultContent;

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Manasik al-Hajj</h2>
      <p className="text-gray-500 mb-8">Essential rites and rituals of Hajj pilgrimage</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {content.map((item, index) => (
          <div key={index} className="border rounded-xl p-5 hover:shadow-md transition">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export const EmergencyContactSection = ({ contacts = [] }) => {
  const defaultContacts = [
    { id: 1, name: "Customer Support", contact_type: "phone", value: "+234 800 123 4567", description: "Available 24/7 for emergencies" },
    { id: 2, name: "WhatsApp Support", contact_type: "whatsapp", value: "+234 800 123 4567", description: "Fast response via WhatsApp" },
    { id: 3, name: "Email Support", contact_type: "email", value: "support@assemblytravels.com", description: "Non-urgent inquiries" },
    { id: 4, name: "Emergency Hotline", contact_type: "phone", value: "+234 800 999 9999", description: "Life-threatening emergencies only" },
  ];

  const contactList = contacts && contacts.length > 0 ? contacts : defaultContacts;

  const getContactIcon = (type) => {
    switch (type) {
      case "phone": return <Phone className="w-5 h-5" />;
      case "whatsapp": return <MessageCircle className="w-5 h-5" />;
      case "email": return <Mail className="w-5 h-5" />;
      default: return <Phone className="w-5 h-5" />;
    }
  };

  const getContactColor = (type) => {
    switch (type) {
      case "phone": return "bg-blue-100 text-blue-600";
      case "whatsapp": return "bg-green-100 text-green-600";
      case "email": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-6 h-6 text-red-500" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Emergency Contacts</h2>
          <p className="text-gray-500 text-sm">Reach out for immediate assistance</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contactList.map((contact) => (
          <div key={contact.id} className="border rounded-xl p-4 hover:shadow-md transition">
            <div className="flex items-start gap-3">
              <div className={`p-3 rounded-lg ${getContactColor(contact.contact_type)}`}>{getContactIcon(contact.contact_type)}</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{contact.name}</h3>
                <p className="text-lg font-semibold text-emerald-600">{contact.value}</p>
                {contact.description && <p className="text-sm text-gray-500 mt-1">{contact.description}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-100">
        <p className="text-sm text-red-700"><strong>Note:</strong> For life-threatening emergencies, please call the Emergency Hotline immediately.</p>
      </div>
    </motion.div>
  );
};

export const SupportSection = () => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
    <h2 className="text-2xl font-bold text-gray-800">Support</h2>
    <p className="text-gray-500">Use Emergency Contacts for urgent issues.</p>
  </motion.div>
);