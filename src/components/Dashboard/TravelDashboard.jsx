import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TravelDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for the dashboard
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBookings([
        { id: 1, destination: 'Bali, Indonesia', date: '2023-11-15', status: 'Confirmed', price: '$1,200' },
        { id: 2, destination: 'Paris, France', date: '2023-12-10', status: 'Pending', price: '$1,800' },
        { id: 3, destination: 'Tokyo, Japan', date: '2024-01-05', status: 'Confirmed', price: '$2,500' },
        { id: 4, destination: 'New York, USA', date: '2023-11-30', status: 'Cancelled', price: '$1,500' },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  // Stats data
  const stats = [
    { title: 'Total Bookings', value: '24', change: '+12%', icon: '📅' },
    { title: 'Revenue', value: '$18,240', change: '+8%', icon: '💰' },
    { title: 'Destinations', value: '16', change: '+2', icon: '🌍' },
    { title: 'Customer Rating', value: '4.8/5', change: '+0.2', icon: '⭐' },
  ];

  // Popular destinations
  const popularDestinations = [
    { name: 'Bali, Indonesia', image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', bookings: 142 },
    { name: 'Paris, France', image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', bookings: 128 },
    { name: 'Tokyo, Japan', image: 'https://images.unsplash.com/photo-1540959733332-45e6d6ad5e9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', bookings: 98 },
    { name: 'Santorini, Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', bookings: 87 },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="relative top-0 left-0 min-h-screen p-6 gradient-to-br from-blue-50 to-indigo-100">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.header 
          className="flex items-center justify-between mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">TravelEase Dashboard</h1>
            <p className="text-gray-600">Manage your travel bookings and explore new destinations</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
            <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full blue-500">
              JD
            </div>
          </div>
        </motion.header>

        {/* Navigation Tabs */}
        <motion.nav 
          className="flex mb-8 space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {['overview', 'bookings', 'destinations', 'customers', 'reports'].map(tab => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${activeTab === tab ? 'blue-500 text-white' : ' text-gray-700 hover:gray-100'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </motion.nav>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col p-6 shadow-md rounded-xl"
              whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <h3 className="mt-1 text-2xl font-bold text-gray-800">{stat.value}</h3>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div className="mt-4">
                <span className="text-sm font-medium text-green-500">{stat.change} from last month</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Recent Bookings */}
          <motion.div 
            className="p-6 shadow-md lg:col-span-2 rounded-xl"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
              <button className="font-medium text-blue-500 hover:text-blue-700">View All</button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-40">
                <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {bookings.map(booking => (
                    <motion.div 
                      key={booking.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:gray-50"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div>
                        <h3 className="font-medium text-gray-800">{booking.destination}</h3>
                        <p className="text-sm text-gray-500">{booking.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'Confirmed' ? 'green-100 text-green-800' : 
                          booking.status === 'Pending' ? 'yellow-100 text-yellow-800' : 
                          'red-100 text-red-800'
                        }`}>
                          {booking.status}
                        </span>
                        <span className="font-medium text-gray-800">{booking.price}</span>
                        <button className="text-blue-500 hover:text-blue-700">View</button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>

          {/* Popular Destinations */}
          <motion.div 
            className="p-6 shadow-md rounded-xl"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <h2 className="mb-6 text-xl font-bold text-gray-800">Popular Destinations</h2>
            <div className="space-y-4">
              {popularDestinations.map((destination, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center p-3 space-x-4 rounded-lg cursor-pointer hover:gray-50"
                  whileHover={{ x: 5, transition: { type: "spring", stiffness: 300 } }}
                >
                  <div className="w-16 h-16 overflow-hidden rounded-lg">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{destination.name}</h3>
                    <p className="text-sm text-gray-500">{destination.bookings} bookings</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="w-full py-2 mt-6 font-medium text-blue-500 transition-colors rounded-lg blue-50 hover:blue-100">
              Explore More Destinations
            </button>
          </motion.div>
        </div>

        {/* Upcoming Trips */}
        <motion.div 
          className="p-6 mt-8 shadow-md rounded-xl"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <h2 className="mb-6 text-xl font-bold text-gray-800">Upcoming Trips</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { destination: 'Bali, Indonesia', date: 'Nov 15 - Nov 22, 2023', type: 'Beach Vacation', image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
              { destination: 'Paris, France', date: 'Dec 10 - Dec 17, 2023', type: 'City Tour', image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
              { destination: 'Tokyo, Japan', date: 'Jan 5 - Jan 15, 2024', type: 'Cultural Experience', image: 'https://images.unsplash.com/photo-1540959733332-45e6d6ad5e9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
            ].map((trip, index) => (
              <motion.div 
                key={index}
                className="overflow-hidden border border-gray-200 shadow-md rounded-xl"
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 300 } }}
              >
                <div className="h-40 overflow-hidden">
                  <img 
                    src={trip.image} 
                    alt={trip.destination}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800">{trip.destination}</h3>
                  <p className="mt-1 text-sm text-gray-500">{trip.date}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="px-2 py-1 text-xs font-medium text-blue-800 rounded-full blue-100">
                      {trip.type}
                    </span>
                    <button className="text-sm font-medium text-blue-500 hover:text-blue-700">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TravelDashboard;