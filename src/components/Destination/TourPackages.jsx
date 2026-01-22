import { useState } from "react";
import { MapPin, Users, Clock, CheckCircle, Heart, Share2 } from "lucide-react";

const TourPackages = ({ allPackages }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]
    );
  };

  if (!allPackages || allPackages.length === 0) return null;

  return (
    <section className="py-16 bg-[#F3F4F6]">
      <div className="container px-4 mx-auto">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-semibold text-emerald-600 bg-emerald-100 rounded-full">
            ✨ Featured Packages
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Your Sacred Umrah Journey Awaits
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Carefully designed Umrah packages to help you perform your pilgrimage with ease, comfort, and complete devotion in the holy cities of Makkah and Madinah.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {allPackages.map((pkg) => {
            const highlights = pkg.spiritual_highlights
              ? pkg.spiritual_highlights.split(",").map((h) => h.trim())
              : [];

            return (
              <div
                key={pkg.id}
                className="overflow-hidden transition-all duration-500 bg-white border border-gray-100 shadow-lg group rounded-3xl hover:shadow-2xl hover:border-emerald-200"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <img
                    src={pkg.cover_image_url || pkg.cover_image}
                    alt={pkg.name}
                    className="object-cover w-full h-64 transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay Badges */}
                  <div className="absolute flex flex-col gap-2 top-4 left-4">
                    <div className="px-3 py-1 text-xs font-semibold text-white bg-green-600 rounded-full shadow-lg">
                      Easy
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute flex flex-col gap-2 top-4 right-4">
                    <button
                      onClick={() => toggleFavorite(pkg.id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                        favorites.includes(pkg.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/90 text-gray-600 hover:bg-white"
                      }`}
                    >
                      <Heart
                        size={18}
                        fill={favorites.includes(pkg.id) ? "currentColor" : "none"}
                      />
                    </button>
                    <button className="p-2 text-gray-600 transition-colors duration-300 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white">
                      <Share2 size={18} />
                    </button>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute px-3 py-1 text-xs text-white rounded-full bottom-4 left-4 bg-black/70 backdrop-blur-sm">
                    🗓️ {pkg.duration_days} Days / {pkg.duration_nights} Nights
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-emerald-600">
                      {pkg.name}
                    </h3>
                    <div className="flex items-center text-gray-600">
                      <MapPin size={16} className="mr-1" />
                      <span className="text-sm">{pkg.location}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-md md:text-2xl font-bold text-emerald-600">
                      ₦{Number(pkg.price_current).toLocaleString()}
                    </span>
                    {pkg.price_original && (
                      <span className="block text-sm text-gray-400 line-through">
                        ₦{Number(pkg.price_original).toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mb-4 text-gray-600 line-clamp-2">{pkg.description}</p>

                  {/* Highlights */}
                  {highlights.length > 0 && (
                    <div className="mb-4">
                      <h4 className="mb-2 text-sm font-semibold text-gray-900">
                        Spiritual Highlights:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {highlights.map((highlight, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 text-xs font-medium text-emerald-700 rounded-full bg-emerald-50"
                          >
                            <CheckCircle size={12} className="mr-1" />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={16} className="mr-2 text-emerald-500" />
                      {pkg.duration_days} Days / {pkg.duration_nights} Nights
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={16} className="mr-2 text-emerald-500" />
                      Group ({pkg.group_size_min}-{pkg.group_size_max})
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full py-3 font-semibold text-white transition-all duration-300 rounded-xl bg-emerald-600 hover:bg-emerald-700 hover:scale-105">
                    View Details & Book
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-8 py-4 font-semibold text-emerald-600 transition-all duration-300 transform border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white rounded-2xl hover:scale-105">
            View All Umrah & Hajj Packages
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TourPackages;
