import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();
  const currentYear = new Date().getFullYear(); // dynamic year

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: "🕋",
      submenu: [
        { label: "Overview", path: "/dashboard" },
        { label: "Registration Progress", path: "/dashboard/progress" },
      ],
    },
    {
      id: "journey",
      label: "Journey Details",
      path: "/dashboard/journey",
      icon: "✈️",
      submenu: [
        { label: "Hajj / Umrah Info", path: "/dashboard/journey/details" },
        { label: "Travel Itinerary", path: "/dashboard/journey/itinerary" },
        { label: "Accommodation", path: "/dashboard/journey/accommodation" },
      ],
    },
    {
      id: "bookings",
      label: "All Bookings",
      path: "/dashboard/bookings",
      icon: "📅",
      submenu: [
        { label: "Flights", path: "/dashboard/bookings/flights" },
        { label: "Hotels", path: "/dashboard/bookings/hotels" },
        { label: "Transport", path: "/dashboard/bookings/transport" },
      ],
    },
    {
      id: "guidance",
      label: "Manāsik Guidance",
      path: "/dashboard/guidance",
      icon: "📖",
      submenu: [
        { label: "Ihram Guide", path: "/dashboard/guidance/ihram" },
        { label: "Tawaf & Sa’i", path: "/dashboard/guidance/tawaf" },
        { label: "Dua & Prayers", path: "/dashboard/guidance/dua" },
      ],
    },
    {
      id: "documents",
      label: "Documents",
      path: "/dashboard/documents",
      icon: "📂",
      submenu: [
        { label: "Visa", path: "/dashboard/documents/visa" },
        { label: "Passport", path: "/dashboard/documents/passport" },
        { label: "Vaccination", path: "/dashboard/documents/vaccination" },
      ],
    },
    {
      id: "support",
      label: "Support",
      path: "/dashboard/support",
      icon: "☎️",
      submenu: [
        { label: "Contact Agent", path: "/dashboard/support/contact" },
        { label: "Emergency Help", path: "/dashboard/support/emergency" },
      ],
    },
  ];

  const toggleSubmenu = (id) => {
    setActiveSubmenu(activeSubmenu === id ? null : id);
  };

  const isActivePath = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <motion.div
      className="fixed top-0 left-0 min-h-screen text-white bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl"
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ type: "spring", damping: 25 }}
    >
      {/* Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute z-10 p-2 text-white bg-green-600 rounded-full -right-3 top-6"
      >
        {isCollapsed ? "→" : "←"}
      </button>

      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 font-bold rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
            🕋
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-green-400">
                Assembly Travels & Tours
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Menu */}
      <nav className="p-4">
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <div
                className={`rounded-lg ${
                  isActivePath(item.path)
                    ? "bg-green-500/20 border-l-4 border-green-400"
                    : "hover:bg-gray-700/40"
                }`}
              >
                <Link
                  to={item.path}
                  onClick={(e) => {
                    if (item.submenu) {
                      e.preventDefault();
                      toggleSubmenu(item.id);
                    }
                  }}
                  className="flex items-center gap-3 p-3"
                >
                  <span className="text-xl">{item.icon}</span>
                  {!isCollapsed && (
                    <span className="flex-1">{item.label}</span>
                  )}
                  {!isCollapsed && item.submenu && (
                    <span className="text-xs">
                      {activeSubmenu === item.id ? "▲" : "▼"}
                    </span>
                  )}
                </Link>

                {!isCollapsed && item.submenu && (
                  <AnimatePresence>
                    {activeSubmenu === item.id && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="ml-8 space-y-1"
                      >
                        {item.submenu.map((sub) => (
                          <li key={sub.path}>
                            <Link
                              to={sub.path}
                              className={`block px-3 py-2 text-sm rounded ${
                                location.pathname === sub.path
                                  ? "text-green-400 bg-green-500/10"
                                  : "text-gray-300 hover:bg-gray-600/30"
                              }`}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* User */}
      {!isCollapsed && (
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600">
              🧕
            </div>
            <div>
              <p className="text-sm font-medium">Pilgrim Name</p>
              <p className="text-xs text-gray-400">Hajj {currentYear}</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Sidebar;
