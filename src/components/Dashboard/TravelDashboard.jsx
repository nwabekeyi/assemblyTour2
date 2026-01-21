import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TravelDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [journeySteps, setJourneySteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear(); // dynamic year

  useEffect(() => {
    // Simulate fetching user journey data uploaded by the company
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
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.header
          className="flex items-center justify-between mb-8"
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Assembly Travels & Tours
            </h1>
            <p className="text-gray-600">
              Your Hajj Journey for {currentYear} 🤲
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Hajj {currentYear}</span>
            <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-emerald-600">
              🧕
            </div>
          </div>
        </motion.header>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {["overview", "journey", "manasik", "documents"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg capitalize font-medium ${
                activeTab === tab
                  ? "bg-emerald-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab === "manasik" ? "Manāsik" : tab}
            </button>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="p-6 bg-white shadow rounded-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h3 className="mt-1 text-2xl font-bold text-gray-800">
                    {stat.value}
                  </h3>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Journey Progress + Holy Sites */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="p-6 bg-white shadow lg:col-span-2 rounded-xl">
            <h2 className="mb-6 text-xl font-bold text-gray-800">
              Registration & Journey Progress
            </h2>

            {loading ? (
              <div className="flex justify-center py-10">
                <div className="w-10 h-10 border-t-2 border-emerald-600 rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {journeySteps.map((step) => (
                    <motion.div
                      key={step.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <span className="font-medium text-gray-800">
                        {step.title}
                      </span>
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
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

          <div className="p-6 bg-white shadow rounded-xl">
            <h2 className="mb-6 text-xl font-bold text-gray-800">
              Holy Sites
            </h2>
            <div className="space-y-4">
              {holyPlaces.map((place, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50"
                  whileHover={{ x: 5 }}
                >
                  <img
                    src={place.image}
                    alt={place.name}
                    className="object-cover w-16 h-16 rounded-lg"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{place.name}</h3>
                    <p className="text-sm text-gray-500">{place.note}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Manāsik */}
        <motion.div
          className="p-6 mt-8 bg-white shadow rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="mb-6 text-xl font-bold text-gray-800">
            Upcoming Manāsik
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Ihram & Niyyah",
              "Tawaf al-Qudum",
              "Sa’i",
              "Standing at Arafah",
              "Stoning of Jamarat",
            ].map((manasik, i) => (
              <div key={i} className="p-4 border rounded-xl hover:shadow-md">
                <h3 className="font-semibold text-gray-800">{manasik}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Step-by-step guidance uploaded by Assembly Travels & Tours
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TravelDashboard;
