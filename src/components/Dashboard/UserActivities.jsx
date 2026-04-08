import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Clock, 
  Plane,
  Building,
  AlertCircle,
  MapPin,
  Calendar,
  Users,
  FileText,
  Wallet,
  Shield,
  FileCheck,
  X,
  Plus
} from "lucide-react";

const JourneySubTab = ({ id, label, icon: Icon, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      active 
        ? "bg-emerald-100 text-emerald-700" 
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

const UserActivities = ({ user, registration, userStats }) => {
  const navigate = useNavigate();
  const stats = userStats?.stats || {};
  const currentJourney = userStats?.current_journey;
  const travelHistory = userStats?.travel_history || [];
  const [activeTab, setActiveTab] = useState("progress");

  const regStatus = registration?.status;
  const canStartNew = regStatus === "completed" || regStatus === "failed";
  const isActive = registration && !canStartNew;

  const statsCards = [
    { label: "Total Travels", value: stats.total_travels || 0, icon: Plane, color: "bg-blue-100 text-blue-600" },
    { label: "In Progress", value: stats.pending_travels || 0, icon: Clock, color: "bg-amber-100 text-amber-600" },
    { label: "Completed", value: stats.completed_travels || 0, icon: CheckCircle, color: "bg-green-100 text-green-600" },
    { label: "Failed", value: stats.failed_travels || 0, icon: AlertCircle, color: "bg-red-100 text-red-600" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome back, {user?.first_name || user?.username || "Pilgrim"}!
        </h2>
        <p className="text-gray-500">Here's your travel dashboard overview</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className={`text-lg font-bold text-gray-800 ${stat.isText ? 'text-sm' : 'text-xl'}`}>{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {currentJourney ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Current Journey</h3>
            {(() => {
              const presence = currentJourney.journey_presence_status || "pre_travel";
              const meta = {
                pre_travel: { label: "Awaiting Travel", className: "bg-gray-100 text-gray-700" },
                in_mecca: { label: "In Mecca", className: "bg-blue-100 text-blue-700" },
                arrived: { label: "Arrived", className: "bg-emerald-100 text-emerald-700" },
                did_not_arrive: { label: "Did Not Arrive", className: "bg-red-100 text-red-700" },
              };
              const badge = meta[presence] || meta.pre_travel;
              return (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.className}`}>
                  {badge.label}
                </span>
              );
            })()}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            <JourneySubTab 
              id="progress" 
              label="Progress" 
              icon={CheckCircle} 
              active={activeTab === "progress"} 
              onClick={() => setActiveTab("progress")} 
            />
            <JourneySubTab 
              id="visa" 
              label="Visa" 
              icon={Shield} 
              active={activeTab === "visa"} 
              onClick={() => setActiveTab("visa")} 
            />
            <JourneySubTab 
              id="travel" 
              label="Documents" 
              icon={FileCheck} 
              active={activeTab === "travel"} 
              onClick={() => setActiveTab("travel")} 
            />
            <JourneySubTab 
              id="flight" 
              label="Flight" 
              icon={Plane} 
              active={activeTab === "flight"} 
              onClick={() => setActiveTab("flight")} 
            />
            <JourneySubTab 
              id="hotel" 
              label="Hotel" 
              icon={Building} 
              active={activeTab === "hotel"} 
              onClick={() => setActiveTab("hotel")} 
            />
          </div>

          {activeTab === "progress" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Package</p>
                  <p className="font-medium text-gray-800">{currentJourney.package || "Not Assigned"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Current Step</p>
                  <p className="font-medium text-gray-800">{currentJourney.current_step || "N/A"}</p>
                </div>
              </div>
              {currentJourney.journey_presence_notes && (
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <h4 className="font-medium text-gray-800">Latest Update</h4>
                  </div>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{currentJourney.journey_presence_notes}</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "visa" && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg">
                <Shield className="w-6 h-6 text-amber-600" />
                <div>
                  <p className="font-medium text-gray-800">Visa Status</p>
                  <p className="text-sm text-gray-600">Your visa is being processed. We'll notify you once it's ready.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "travel" && (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-800">Travel Documents</p>
                  <p className="text-sm text-gray-600">Download your travel documents once issued.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "flight" && (
            <div className="space-y-3">
              {currentJourney.ticket_info ? (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Plane className="w-5 h-5 text-blue-600" />
                    <h4 className="font-medium text-gray-800">Flight Details</h4>
                  </div>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{currentJourney.ticket_info}</p>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Plane className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-800">Flight Details</p>
                    <p className="text-sm text-gray-500">Not yet assigned. We'll notify you soon.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "hotel" && (
            <div className="space-y-3">
              {currentJourney.hotel_info ? (
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-5 h-5 text-purple-600" />
                    <h4 className="font-medium text-gray-800">Accommodation</h4>
                  </div>
                  <p className="text-sm text-gray-600 whitespace-pre-line">{currentJourney.hotel_info}</p>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Building className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-800">Accommodation</p>
                    <p className="text-sm text-gray-500">Not yet assigned. We'll notify you soon.</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
) : canStartNew ? (
         <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
           <CheckCircle className="w-10 h-10 mx-auto mb-3 text-emerald-500" />
           <h3 className="font-semibold text-emerald-800">
             {regStatus === "completed" ? "Registration Completed!" : "Registration Ended"}
           </h3>
           <p className="text-emerald-700 text-sm mt-1">
             {regStatus === "completed" 
               ? "Congratulations on completing your journey. You can register for a new package."
               : "Your previous registration has ended. You can start a new one."}
           </p>
           <a href="/packages" className="mt-4 inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
             <Plus className="w-4 h-4" />
             Register for New Package
           </a>
         </div>
) : (
         <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
           <AlertCircle className="w-10 h-10 mx-auto mb-3 text-amber-500" />
           <h3 className="font-semibold text-amber-800">No Active Package</h3>
           <p className="text-amber-700 text-sm mt-1">
             You are not currently on any package. Browse our packages to book your next journey.
           </p>
           <a href="/packages" className="mt-4 inline-block bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium">
             Select Package
           </a>
         </div>
       )}

      {travelHistory.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Travel History</h3>
          
          <div className="space-y-3">
            {travelHistory.map((travel, index) => (
              <div key={travel.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    travel.status === 'completed'
                      ? "bg-green-100 text-green-600"
                      : travel.status === 'pending'
                      ? "bg-blue-100 text-blue-600"
                      : "bg-red-100 text-red-600"
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{travel.package || "Hajj Package"}</p>
                    <p className="text-xs text-gray-500">{travel.current_step}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    travel.status === 'completed'
                      ? "bg-green-100 text-green-700"
                      : travel.status === 'pending'
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {travel.status}
                  </span>
                  {travel.completed_at && (
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(travel.completed_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default UserActivities;
