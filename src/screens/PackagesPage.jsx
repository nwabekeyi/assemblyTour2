// PackagesPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiClock, FiUsers, FiStar } from 'react-icons/fi';

const PackagesPage = () => {
  const packages = [
    {
      id: 1,
      name: "Bali Paradise",
      destination: "Bali, Indonesia",
      duration: "7 Days",
      groupSize: "2-12 People",
      price: 899,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500",
      highlights: ["Beach Resort", "Temple Tour", "Spa Day", "Sunset Dinner"]
    },
    {
      id: 2,
      name: "Tokyo Adventure",
      destination: "Tokyo, Japan",
      duration: "5 Days",
      groupSize: "1-8 People",
      price: 1200,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1540959733332-8ab4aab5e5e1?w=500",
      highlights: ["City Tour", "Sushi Class", "Mt. Fuji Trip", "Shopping"]
    },
    {
      id: 3,
      name: "European Dream",
      destination: "Paris & Rome",
      duration: "10 Days",
      groupSize: "2-15 People",
      price: 1500,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=500",
      highlights: ["Eiffel Tower", "Colosseum", "Wine Tasting", "Museum Tours"]
    },
    {
      id: 4,
      name: "Tropical Escape",
      destination: "Maldives",
      duration: "6 Days",
      groupSize: "2 People",
      price: 2000,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=500",
      highlights: ["Overwater Villa", "Snorkeling", "Spa", "Private Dinner"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="shadow-sm">
        <div className="px-4 py-8 mx-auto max-w-7xl">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold text-center text-gray-900"
          >
            Travel Packages
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-center text-gray-600"
          >
            Discover our carefully curated travel experiences
          </motion.p>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-5xl px-4 py-8 mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              className="overflow-hidden bg-white border border-gray-200 shadow-md rounded-xl"
            >
              {/* Package Image */}
              <div className="relative">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="object-cover w-full h-48"
                />
                <div className="absolute flex items-center gap-1 px-2 py-1 bg-white rounded-full top-3 right-3">
                  <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold">{pkg.rating}</span>
                </div>
              </div>

              {/* Package Details */}
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {pkg.name}
                </h3>
                
                <div className="flex items-center mb-3 text-gray-600">
                  <FiMapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{pkg.destination}</span>
                </div>

                <div className="flex gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FiClock className="w-4 h-4" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiUsers className="w-4 h-4" />
                    <span>{pkg.groupSize}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <h4 className="mb-2 font-semibold text-gray-900">Highlights:</h4>
                  <div className="flex flex-wrap gap-2">
                    {pkg.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and Book Button */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      ${pkg.price}
                    </span>
                    <span className="text-sm text-gray-600"> per person</span>
                  </div>
                  <button className="px-6 py-2 font-semibold text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600">
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PackagesPage;