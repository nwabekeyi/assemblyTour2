import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, CheckCircle, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import useDashboardStore from "../../store/dashboard.store";

const TravelHistory = () => {
  const { travelHistory, travelHistoryPagination, fetchTravelHistory, cancelRegistration } = useDashboardStore();
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(null);
  const [showCancelConfirm, setShowCancelConfirm] = useState(null);
  const [expandedItems, setExpandedItems] = useState(new Set());

  useEffect(() => {
    loadHistory(1);
  }, []);

  const loadHistory = async (page) => {
    setLoading(true);
    await fetchTravelHistory(page);
    setLoading(false);
  };

  const handleCancelClick = (travel) => {
    setShowCancelConfirm(travel);
  };

  const confirmCancel = async () => {
    if (!showCancelConfirm) return;
    
    setCancelling(showCancelConfirm.id);
    const result = await cancelRegistration(showCancelConfirm.id);
    setCancelling(null);
    setShowCancelConfirm(null);
    
    if (result?.success) {
      loadHistory(travelHistoryPagination?.page || 1);
    } else {
      // If not admin, redirect to support
      window.location.href = "/dashboard/support";
    }
  };

const getStatusIcon = (status) => {
  switch (status) {
    case "completed": return <CheckCircle className="w-4 h-4 text-green-500" />;
    case "pending": return <Clock className="w-4 h-4 text-blue-500" />;
    case "failed": return <XCircle className="w-4 h-4 text-red-500" />;
    default: return <Clock className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "completed": return "bg-green-100 text-green-700";
    case "pending": return "bg-blue-100 text-blue-700";
    case "failed": return "bg-red-100 text-red-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

const toggleExpand = (id) => {
  setExpandedItems(prev => {
    const newSet = new Set(prev);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    return newSet;
  });
};

const isExpanded = (id) => expandedItems.has(id);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600" />
      </div>
    );
  }

  const { page, page_size, total, total_pages } = travelHistoryPagination || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Travel History</h2>

{travelHistory.length === 0 ? (
         <p className="text-gray-500 text-center py-8">No travel history found.</p>
       ) : (
         <>
           <div className="space-y-4">
             {travelHistory.map((travel) => (
               <div key={travel.id} className="border rounded-xl p-4">
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                     <div className={`p-3 rounded-lg ${getStatusColor(travel.status)}`}>
                       {getStatusIcon(travel.status)}
                     </div>
                     <div className="flex-1 min-w-0">
                       <h4 className="font-semibold text-gray-800">{travel.package || "Hajj Package"}</h4>
                       <p className="text-sm text-gray-600">
                         {travel.current_step} • {new Date(travel.created_at).toLocaleDateString()} 
                         {travel.updated_at ? `• ${new Date(travel.updated_at).toLocaleDateString()}` : ''}
                       </p>
                     </div>
                   </div>
                   <div className="ml-3">
                     <button
                       onClick={() => toggleExpand(travel.id)}
                       className={`p-1 rounded hover:bg-gray-50 transition-colors`}
                     >
                       {isExpanded(travel.id) ? (
                         <XCircle className="w-4 h-4 text-gray-600" />
                       ) : (
                         <ChevronRight className="w-4 h-4 text-gray-600" />
                       )}
                     </button>
                   </div>
                 </div>
                 
                 {isExpanded(travel.id) && (
                   <div className="mt-4 pt-4 border-t">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                         <p className="text-xs text-gray-500 font-medium">Status History</p>
                         <p className="text-sm text-gray-600">{travel.status}</p>
                       </div>
                       <div>
                         <p className="text-xs text-gray-500 font-medium">Completed Steps</p>
                         <p className="text-sm text-gray-600">{travel.steps_completed}/{travel.total_steps}</p>
                       </div>
                     </div>
                     <p className="mt-3 text-sm text-gray-600">
                       {travel.journey_presence_notes || "No journey updates available."}
                     </p>
                   </div>
                 )}
                 
                 <div className="ml-3">
                   <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(travel.status)}`}>
                     {travel.status}
                   </span>
                 </div>
                 {travel.status === "pending" && (
                   <button
                     onClick={() => handleCancelClick(travel)}
                     disabled={cancelling === travel.id}
                     className="mt-2 px-3 py-1 text-sm text-red-600 hover:text-red-700 border border-red-200 rounded hover:bg-red-50"
                   >
                     {cancelling === travel.id ? "Processing..." : "Cancel"}
                   </button>
                 )}
               </div>
             ))}
           </div>

          {total_pages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => loadHistory(page - 1)}
                disabled={page <= 1}
                className="p-2 border rounded-lg disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-500">
                Page {page} of {total_pages} ({total} total)
              </span>
              <button
                onClick={() => loadHistory(page + 1)}
                disabled={page >= total_pages}
                className="p-2 border rounded-lg disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}

      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md mx-4">
            <h3 className="text-lg font-bold mb-2">Cancel Registration?</h3>
            <p className="text-gray-600 mb-4">
              Only administrators can cancel registrations. Would you like to contact support to help cancel this registration?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelConfirm(null)}
                className="flex-1 py-2 border rounded-lg"
              >
                No, Keep It
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 py-2 bg-emerald-600 text-white rounded-lg"
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TravelHistory;