import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: '📊',
      submenu: [
        { label: 'Overview', path: '/dashboard' },
        { label: 'Analytics', path: '/dashboard/analytics' },
        { label: 'Reports', path: '/dashboard/reports' },
      ]
    },
    {
      id: 'events',
      label: 'Events & Tours',
      path: '/dashboard/events',
      icon: '🎯',
      submenu: [
        { label: 'All Events', path: '/dashboard/events' },
        { label: 'Create Event', path: '/dashboard/events/create' },
        { label: 'Calendar', path: '/dashboard/events/calendar' },
      ]
    },
    {
      id: 'packages',
      label: 'Travel Packages',
      path: '/dashboard/packages',
      icon: '🎒',
      submenu: [
        { label: 'All Packages', path: '/dashboard/packages' },
        { label: 'Create Package', path: '/dashboard/packages/create' },
        { label: 'Categories', path: '/dashboard/packages/categories' },
      ]
    },
    {
      id: 'users',
      label: 'Users',
      path: '/dashboard/users',
      icon: '👥',
      submenu: [
        { label: 'All Users', path: '/dashboard/users' },
        { label: 'Add User', path: '/dashboard/users/create' },
        { label: 'User Roles', path: '/dashboard/users/roles' },
      ]
    },
    {
      id: 'bookings',
      label: 'Bookings',
      path: '/dashboard/bookings',
      icon: '📅',
      submenu: [
        { label: 'All Bookings', path: '/dashboard/bookings' },
        { label: 'Pending', path: '/dashboard/bookings/pending' },
        { label: 'Confirmed', path: '/dashboard/bookings/confirmed' },
      ]
    },
    {
      id: 'destinations',
      label: 'Destinations',
      path: '/dashboard/destinations',
      icon: '🌍',
      submenu: [
        { label: 'All Destinations', path: '/dashboard/destinations' },
        { label: 'Popular', path: '/dashboard/destinations/popular' },
        { label: 'Add New', path: '/dashboard/destinations/create' },
      ]
    }
  ];

  const toggleSubmenu = (menuId) => {
    setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
  };

  const isActivePath = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const sidebarVariants = {
    expanded: { width: "256px" },
    collapsed: { width: "80px" }
  };

  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -20 }
  };

  const submenuVariants = {
    open: { 
      opacity: 1, 
      height: "auto",
      transition: { 
        staggerChildren: 0.1
      }
    },
    closed: { 
      opacity: 0, 
      height: 0 
    }
  };

  const subItemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -10 }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 min-h-screen text-white shadow-xl bg-gradient-to-b from-gray-900 to-gray-800"
      variants={sidebarVariants}
      initial="expanded"
      animate={isCollapsed ? "collapsed" : "expanded"}
      transition={{ type: "spring", damping: 25 }}
    >
      {/* Toggle Button */}
      <motion.button
        className="absolute z-10 p-2 text-white bg-blue-500 rounded-full shadow-lg -right-3 top-6 hover:bg-blue-600"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? '→' : '←'}
      </motion.button>

      {/* Logo Section */}
      <div className="p-6 border-b border-gray-700">
        <motion.div 
          className="flex items-center space-x-3"
          animate={isCollapsed ? { justifyContent: "center" } : { justifyContent: "flex-start" }}
        >
          <div className="flex items-center justify-center w-10 h-10 text-lg font-bold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
            ✈️
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                  TravelEase
                </h1>
                <p className="text-xs text-gray-400">Admin Panel</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation Menu */}
      <nav className="p-4">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.id}>
              <motion.div
                className={`rounded-lg transition-all duration-200 ${
                  isActivePath(item.path) 
                    ? 'bg-blue-500/20 border-l-4 border-blue-400' 
                    : 'hover:bg-gray-700/50'
                }`}
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center justify-between p-3 cursor-pointer">
                  <Link 
                    to={item.path} 
                    className="flex items-center flex-1 space-x-3"
                    onClick={(e) => {
                      if (item.submenu) {
                        e.preventDefault();
                        toggleSubmenu(item.id);
                      }
                    }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          variants={itemVariants}
                          initial="expanded"
                          animate={isCollapsed ? "collapsed" : "expanded"}
                          className="font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Link>
                  
                  {item.submenu && !isCollapsed && (
                    <motion.span
                      animate={{ rotate: activeSubmenu === item.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-400"
                    >
                      ▼
                    </motion.span>
                  )}
                </div>

                {/* Submenu */}
                {item.submenu && !isCollapsed && (
                  <AnimatePresence>
                    {activeSubmenu === item.id && (
                      <motion.ul
                        variants={submenuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="ml-8 space-y-1 overflow-hidden"
                      >
                        {item.submenu.map((subItem, index) => (
                          <motion.li
                            key={subItem.path}
                            variants={subItemVariants}
                          >
                            <Link
                              to={subItem.path}
                              className={`block py-2 px-3 rounded text-sm transition-colors ${
                                location.pathname === subItem.path
                                  ? 'text-blue-400 bg-blue-500/10'
                                  : 'text-gray-300 hover:text-white hover:bg-gray-600/30'
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                )}
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile Section */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-800/50"
          >
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-r from-green-500 to-blue-500">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-gray-400 truncate">Admin</p>
              </div>
              <button className="text-gray-400 transition-colors hover:text-white">
                ⚙️
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Sidebar;