import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiClock, FiUsers, FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import usePackageStore from "../store/package.store";

const PackagesPage = () => {
  const navigate = useNavigate();
  const { allPackages, fetchAllPackages, loading } = usePackageStore();

  useEffect(() => {
    fetchAllPackages();
  }, [fetchAllPackages]);

  // Helper to format price in Naira
  const formatNaira = (amount) =>
    `₦${Number(amount).toLocaleString("en-NG")}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading packages...
      </div>
    );
  }

  // Filter by category (API already returns all together)
  const umrahPackages = allPackages.filter((pkg) => pkg.category === "umrah");
  const hajjPackages = allPackages.filter((pkg) => pkg.category === "hajj");

  const renderPackageCard = (pkg) => {
    const highlights = pkg.spiritual_highlights
      ? pkg.spiritual_highlights.split(",").map((h) => h.trim())
      : [];

    return (
      <motion.div
        key={pkg.id}
        variants={cardVariants}
        whileHover={{
          y: -6,
          boxShadow: "0px 12px 25px rgba(0,0,0,0.12)",
        }}
        onClick={() => navigate(`/packages/${pkg.id}`)}
        className="overflow-hidden bg-white border border-gray-200 rounded-xl cursor-pointer transition-all"
      >
        {/* Image */}
        <div className="relative">
          <img
            src={pkg.cover_image}
            alt={pkg.name}
            className="object-cover w-full h-48"
          />
          <div className="absolute flex items-center gap-1 px-2 py-1 bg-white rounded-full top-3 right-3">
            <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-semibold">
              {pkg.rating || "4.8"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="mb-2 text-xl font-bold text-gray-900">
            {pkg.name}
          </h3>

          <div className="flex items-center mb-3 text-gray-600">
            <FiMapPin className="w-4 h-4 mr-2" />
            <span className="text-sm">{pkg.location}</span>
          </div>

          <div className="flex gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <FiClock className="w-4 h-4" />
              <span>
                {pkg.duration_days} Days / {pkg.duration_nights} Nights
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FiUsers className="w-4 h-4" />
              <span>
                {pkg.group_size_min}-{pkg.group_size_max} people
              </span>
            </div>
          </div>

          {/* Highlights */}
          {highlights.length > 0 && (
            <div className="mb-4">
              <h4 className="mb-2 font-semibold text-gray-900">
                Highlights:
              </h4>
              <div className="flex flex-wrap gap-2">
                {highlights.map((h, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs text-emerald-800 bg-emerald-100 rounded-full"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price + Button */}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">
              {formatNaira(pkg.price_current)}
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent card click
                navigate(`/detail/${pkg.id}`);
              }}
              className="px-6 py-2 font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </motion.div>
    );
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

      {/* Umrah */}
      {umrahPackages.length > 0 && (
        <div className="max-w-5xl px-4 py-8 mx-auto">
          <h2 className="mb-6 text-2xl font-bold text-emerald-700">
            Umrah Packages
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {umrahPackages.map(renderPackageCard)}
          </motion.div>
        </div>
      )}

      {/* Hajj */}
      {hajjPackages.length > 0 && (
        <div className="max-w-5xl px-4 py-8 mx-auto">
          <h2 className="mb-6 text-2xl font-bold text-emerald-700">
            Hajj Packages
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {hajjPackages.map(renderPackageCard)}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PackagesPage;
