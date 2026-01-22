import React from "react";
import { motion } from "framer-motion";

function Attraction({ recentSacredSites }) {
  // ✅ If no sacred sites, render nothing
  if (!recentSacredSites || recentSacredSites.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="w-full py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <h1 className="mb-6 font-serif text-4xl font-bold text-gray-800 md:text-5xl">
            SACRED SITES & ZIYARAH
          </h1>
          <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
            Experience the most blessed and spiritually profound locations during
            your Umrah or Hajj journey.
          </p>
        </motion.div>

        {/* Sacred Sites Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {recentSacredSites.map((site) => (
            <motion.div
              key={site.id}
              variants={itemVariants}
              className="relative overflow-hidden transition-all duration-500 bg-white shadow-lg group rounded-2xl hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <motion.img
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="object-cover w-full h-64"
                  src={site.image}
                  alt={site.name}
                />
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-100" />
              </div>

              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="p-6 transition-all duration-500 transform translate-y-8 bg-black/80 backdrop-blur-sm rounded-xl group-hover:translate-y-0"
                >
                  <h3 className="mb-3 font-serif text-2xl font-bold">
                    {site.name}
                  </h3>
                  <p className="leading-relaxed text-gray-200">
                    {site.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 font-semibold text-white transition-all duration-300 rounded-full bg-emerald-600 hover:bg-emerald-700"
          >
            Explore All Sacred Sites
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default Attraction;
