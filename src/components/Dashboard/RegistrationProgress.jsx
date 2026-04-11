import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Circle, Lock, User, Phone, MapPin, Calendar, FileText, AlertCircle } from "lucide-react";
import useDashboardStore from "../../store/dashboard.store";

const StepDetails = ({ step, registration }) => {
  const userData = registration?.user_data || {};
  const profileImage = userData.profile_picture;
  
  const infoFields = [
    { label: "First Name", value: userData.first_name, icon: User },
    { label: "Last Name", value: userData.last_name, icon: User },
    { label: "Phone Number", value: userData.phone_number, icon: Phone },
    { label: "Date of Birth", value: userData.date_of_birth, icon: Calendar },
    { label: "Gender", value: userData.gender, icon: User },
    { label: "Nationality", value: userData.nationality, icon: MapPin },
    { label: "State of Origin", value: userData.state_of_origin, icon: MapPin },
    { label: "Passport Number", value: userData.passport_number, icon: FileText },
    { label: "Passport Expiry", value: userData.passport_expiry, icon: Calendar },
  ];
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Submitted Details</h3>
      
      {profileImage && (
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Profile Picture</p>
          <a 
            href={profileImage} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img 
              src={profileImage} 
              alt="Profile" 
              className="w-24 h-24 rounded-lg object-cover border border-gray-200 cursor-pointer hover:opacity-80 transition"
            />
          </a>
          <p className="text-xs text-gray-500 mt-1">Click to view full size</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {infoFields.map((field, idx) => (
          field.value ? (
            <div key={idx} className="flex items-start gap-2">
              <field.icon className="w-4 h-4 text-gray-400 mt-0.5" />
              <div>
                <p className="text-xs text-gray-500">{field.label}</p>
                <p className="text-sm font-medium text-gray-800">{field.value}</p>
              </div>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
};

const RegistrationProgress = () => {
  const { registrationProgress, fetchRegistrationProgress, registration } = useDashboardStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    setLoading(true);
    await fetchRegistrationProgress();
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    );
  }

  if (!registrationProgress?.all_steps) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500">No active registration found.</p>
      </div>
    );
  }

  const {
    package: pkg,
    status,
    current_step_code,
    all_steps,
    completed_step_ids,
    steps_completed,
    steps_remaining,
    total_steps,
    current_step
  } = registrationProgress;

  const progressPercent = total_steps > 0 ? Math.round((steps_completed / total_steps) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Registration Progress</h2>
          <p className="text-gray-500">{pkg || "Hajj Package"}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          status === 'completed' 
            ? "bg-green-100 text-green-700"
            : status === 'failed'
            ? "bg-red-100 text-red-700"
            : "bg-blue-100 text-blue-700"
        }`}>
          {status === 'completed' ? 'Completed' : status === 'failed' ? 'Failed' : 'In Progress'}
        </span>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-800">{progressPercent}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-emerald-600 h-3 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{steps_completed} steps completed</span>
          <span>{steps_remaining} remaining</span>
        </div>
      </div>

      <div className="space-y-3">
        {all_steps.map((step, index) => {
          const isCompleted = completed_step_ids.includes(step.id);
          const isCurrent = step.code === current_step_code;
          const stepPending = status === "pending" && isCurrent;
          
          return (
            <div 
              key={step.id}
              className={`flex items-center gap-4 p-4 rounded-lg border ${
                isCompleted 
                  ? "bg-green-50 border-green-200" 
                  : stepPending
                  ? "bg-amber-50 border-amber-200"
                  : isCurrent 
                  ? "bg-blue-50 border-blue-200"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className={`${
                isCompleted 
                  ? "text-green-600" 
                  : stepPending
                  ? "text-amber-600"
                  : isCurrent 
                  ? "text-blue-600"
                  : "text-gray-400"
              }`}>
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6" />
                ) : stepPending ? (
                  <AlertCircle className="w-6 h-6" />
                ) : isCurrent ? (
                  <Clock className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </div>
              <div className="flex-1">
                <p className={`font-medium ${
                  isCompleted 
                    ? "text-green-800" 
                    : stepPending
                    ? "text-amber-800"
                    : isCurrent 
                    ? "text-blue-800"
                    : "text-gray-600"
                }`}>
                  {step.title}
                </p>
                {stepPending && (
                  <p className="text-xs text-amber-600">{current_step !== "Arrival Status" ?  'Awaiting admin approval' : 'Registration Completed. Awating Arrival from destination'}</p>
                )}
                {isCurrent && !stepPending && (
                  <p className="text-xs text-blue-600">Current Step</p>
                )}
              </div>
              <div className="text-sm text-gray-500">
                Step {index + 1}
              </div>
            </div>
          );
        })}
      </div>

      {status === "pending" && (
        <StepDetails step={all_steps.find(s => s.code === current_step_code)} registration={registration} />
      )}
    </motion.div>
  );
};

export default RegistrationProgress;
