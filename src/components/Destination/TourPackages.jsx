import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Users, Clock, CheckCircle, Heart, Share2 } from "lucide-react";

const TourPackages = ({ allPackages }) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const toggleFavorite = (e, id) => {
    e.stopPropagation(); // prevent card click
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
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-semibold text-emerald-600 bg-emerald-100 rounded-full">
            ✨ Featured Packages
          </div>
          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Your Sacred Umrah Journey Awaits
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Carefully designed Umrah packages to help you perform your pilgrimage
            with ease, comfort, and devotion.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {allPackages.map((pkg) => {
            const highlights = pkg.spiritual_highlights
              ? pkg.spiritual_highlights.split(",").map((h) => h.trim())
              : [];

            return (
              <div
                key={pkg.id}
                onClick={() => navigate(`/packages/${pkg.id}`)}
                className="cursor-pointer overflow-hidden transition-all duration-500 bg-white border border-gray-100 shadow-lg group rounded-3xl hover:shadow-2xl hover:border-emerald-200"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={pkg.cover_image_url || pkg.cover_image}
                    alt={pkg.name}
                    className="object-cover w-full h-64 transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Favorite / Share */}
                  <div className="absolute flex flex-col gap-2 top-4 right-4">
                    <button
                      onClick={(e) => toggleFavorite(e, pkg.id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition ${
                        favorites.includes(pkg.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/90 text-gray-600"
                      }`}
                    >
                      <Heart
                        size={18}
                        fill={favorites.includes(pkg.id) ? "currentColor" : "none"}
                      />
                    </button>

                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-full bg-white/90 text-gray-600"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>

                  {/* Duration */}
                  <div className="absolute px-3 py-1 text-xs text-white rounded-full bottom-4 left-4 bg-black/70">
                    🗓️ {pkg.duration_days} Days / {pkg.duration_nights} Nights
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-1 text-xl font-bold text-gray-900 group-hover:text-emerald-600">
                    {pkg.name}
                  </h3>

                  <div className="flex items-center mb-3 text-sm text-gray-600">
                    <MapPin size={16} className="mr-1" />
                    {pkg.location}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-emerald-600">
                      ₦{Number(pkg.price_current).toLocaleString("en-NG")}
                    </span>

                    {pkg.price_original && (
                      <span className="text-sm text-gray-400 line-through">
                        ₦{Number(pkg.price_original).toLocaleString("en-NG")}
                      </span>
                    )}
                  </div>

                  {/* ONE-LINE Description */}
                  <p className="mb-4 text-gray-600 truncate">
                    {pkg.description}
                  </p>

                  {/* Highlights */}
                  {highlights.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {highlights.slice(0, 3).map((highlight, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-3 py-1 text-xs text-emerald-700 rounded-full bg-emerald-50"
                        >
                          <CheckCircle size={12} className="mr-1" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-emerald-500" />
                      {pkg.duration_days} Days
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="mr-2 text-emerald-500" />
                      {pkg.group_size_min}-{pkg.group_size_max}
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/packages/${pkg.id}`);
                    }}
                    className="w-full py-3 font-semibold text-white rounded-xl bg-emerald-700 hover:bg-emerald-800 transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TourPackages;
