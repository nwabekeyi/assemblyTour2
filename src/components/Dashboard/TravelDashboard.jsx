import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TravelDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [journeySteps, setJourneySteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Simulate API delay
    setTimeout(() => {
      setJourneySteps([
        { id: 1, title: "Visa Approved", status: "Completed" },
        { id: 2, title: "Flight Booked", status: "Completed" },
        { id: 3, title: "Accommodation Confirmed", status: "Pending" },
        { id: 4, title: "Ihram Preparation", status: "Upcoming" },
        { id: 5, title: "Arrival in Makkah", status: "Upcoming" },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const stats = [
    { title: "Journey Status", value: "On Track", icon: "🕋" },
    { title: "Days to Departure", value: "18 Days", icon: "⏳" },
    { title: "Documents Ready", value: "3 / 4", icon: "📂" },
    { title: "Manāsik Completed", value: "0 / 5", icon: "📿" },
  ];

  const holyPlaces = [
    {
      name: "Masjid al-Haram",
      image:
        "https://images.unsplash.com/photo-1589187155478-7a10c1a43a64?auto=format&fit=crop&w=500&q=80",
      note: "Tawaf & Sa’i",
    },
    {
      name: "Mina",
      image:
        "https://images.unsplash.com/photo-1609921212029-bb5a28e1f33d?auto=format&fit=crop&w=500&q=80",
      note: "Days of Tashreeq",
    },
    {
      name: "Arafat",
      image:
        "https://images.unsplash.com/photo-1620135263273-5d49c61d0bbf?auto=format&fit=crop&w=500&q=80",
      note: "Day of Arafah",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      {/* Header – centered better on mobile */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="px-4 py-6 sm:px-6 md:px-8 bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              Assembly Travels & Tours
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Your Hajj Journey for {currentYear} 🤲
            </p>
          </div>
          <div className="flex items-center justify-center sm:justify-end gap-3">
            <span className="text-sm text-gray-500">Hajj {currentYear}</span>
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 font-bold text-white rounded-full bg-emerald-600 text-lg sm:text-xl">
              🧕
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10">
        {/* Stats – responsive grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              className="p-5 sm:p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">{stat.title}</p>
                  <h3 className="mt-1 text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                    {stat.value}
                  </h3>
                </div>
                <span className="text-2xl sm:text-3xl">{stat.icon}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Journey Progress + Holy Sites – stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Journey Progress */}
          <div className="lg:col-span-2 p-5 sm:p-6 bg-white rounded-xl shadow-sm">
            <h2 className="mb-5 sm:mb-6 text-xl sm:text-2xl font-bold text-gray-800">
              Registration & Journey Progress
            </h2>

            {loading ? (
              <div className="flex justify-center py-10 sm:py-12">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {journeySteps.map((step) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-3 hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-800 text-base sm:text-lg">
                        {step.title}
                      </span>
                      <span
                        className={`px-4 py-1.5 text-sm rounded-full font-medium ${
                          step.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : step.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {step.status}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Holy Sites */}
          <div className="p-5 sm:p-6 bg-white rounded-xl shadow-sm">
            <h2 className="mb-5 sm:mb-6 text-xl sm:text-2xl font-bold text-gray-800">
              Holy Sites
            </h2>
            <div className="space-y-4">
              {holyPlaces.map((place, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="object-cover w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800 text-base sm:text-lg">
                      {place.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">{place.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Manāsik – responsive grid */}
        <motion.div
          className="mt-8 p-5 sm:p-6 bg-white rounded-xl shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="mb-5 sm:mb-6 text-xl sm:text-2xl font-bold text-gray-800">
            Upcoming Manāsik
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              "Ihram & Niyyah",
              "Tawaf al-Qudum",
              "Sa’i",
              "Standing at Arafah",
              "Stoning of Jamarat",
            ].map((manasik, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 border rounded-xl hover:shadow-md transition-all bg-gray-50/50"
              >
                <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                  {manasik}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-600">
                  Step-by-step guidance uploaded by Assembly Travels & Tours
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default TravelDashboard;