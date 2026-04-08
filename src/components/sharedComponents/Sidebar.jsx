import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useDashboardStore from "../../store/dashboard.store";
import useAuthStore from "../../store/store";

function Sidebar({ onClose }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();
  const { user } = useAuthStore();
  const { userStats, fetchUserStats } = useDashboardStore();

  useEffect(() => {
    fetchUserStats();
  }, [fetchUserStats]);

  const hasActiveJourney = Boolean(userStats?.current_journey);
  const totalTravels = userStats?.stats?.total_travels || 0;

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/dashboard",
      icon: "🕋",
      submenu: [
        { label: "Overview", path: "/dashboard" },
        { label: "Travel History", path: "/dashboard/history" },
      ],
      badge: totalTravels > 0 ? totalTravels : null,
    },
    {
      id: "journey",
      label: "Current Journey",
      path: "/dashboard/journey",
      icon: "✈️",
      submenu: hasActiveJourney ? [
        { label: "Journey Progress", path: "/dashboard/journey" },
        { label: "Flight & Hotel", path: "/dashboard/journey/itinerary" },
        { label: "Documents", path: "/dashboard/journey/documents" },
      ] : [
        { label: "No Active Journey", path: "/dashboard/journey", disabled: true },
      ],
    },
    {
      id: "guidance",
      label: "Manāsik Guidance",
      path: "/dashboard/guidance",
      icon: "📖",
      submenu: [
        { label: "Ihram Guide", path: "/dashboard/guidance/ihram" },
        { label: "Tawaf & Sa'i", path: "/dashboard/guidance/tawaf" },
        { label: "Dua & Prayers", path: "/dashboard/guidance/dua" },
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
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">

      {/* Header / Logo – now clickable to go to home */}
      <div className="p-6 border-b border-gray-700">
        <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <div className="flex items-center justify-center w-10 h-10 font-bold rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
            🕋
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">
              Assembly Travels
            </h1>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
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
                    } else if (onClose) {
                      onClose();
                    }
                  }}
                  className="flex items-center gap-3 p-3"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs bg-green-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {item.submenu && (
                    <span className="text-xs">
                      {activeSubmenu === item.id ? "▲" : "▼"}
                    </span>
                  )}
                </Link>

                {item.submenu && (
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
                            {sub.disabled ? (
                              <span className="block px-3 py-2 text-sm rounded text-gray-500 cursor-not-allowed">
                                {sub.label}
                              </span>
                            ) : (
                              <Link
                                to={sub.path}
                                onClick={sub.disabled ? undefined : () => onClose && onClose()}
                                className={`block px-3 py-2 text-sm rounded ${
                                  location.pathname === sub.path
                                    ? "text-green-400 bg-green-500/10"
                                    : "text-gray-300 hover:bg-gray-600/30"
                                }`}
                              >
                                {sub.label}
                              </Link>
                            )}
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

      {/* User Info – bottom */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          {user?.user?.profile_picture ? (
            <img 
              src={user.user.profile_picture} 
              alt="Profile" 
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-700">
              <span className="text-lg">🧕</span>
            </div>
          )}
          <div>
            <p className="text-sm font-medium">
              {user?.user?.name || user?.user?.username || "Pilgrim"}
            </p>
            <p className="text-xs text-gray-400">
              {user?.user?.phone || ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
