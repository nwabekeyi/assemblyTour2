import { useEffect } from "react";
import { useParams } from "react-router-dom";
import usePackageStore from "../store/package.store";
import Loading from "../components/Spinner/Loading";
import { MapPin, Clock, Users, Star } from "lucide-react";

function PackageDetail() {
  const { id } = useParams();
  const { packageDetail, fetchPackageById, loading } = usePackageStore();

  useEffect(() => {
    fetchPackageById(id);
  }, [id, fetchPackageById]);

  if (loading || !packageDetail) return <Loading />;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Section */}
      <div className="relative h-[420px] w-full">
        <img
          src={packageDetail.cover_image}
          alt={packageDetail.name}
          className="object-cover w-full h-full"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-6xl px-6 py-10 mx-auto">
            <div className="flex flex-col gap-3 text-white">
              <span className="inline-block w-fit px-4 py-1 text-sm font-semibold rounded-full bg-emerald-600/90">
                {packageDetail.category?.toUpperCase()}
              </span>

              <h1 className="text-4xl md:text-5xl font-bold">
                {packageDetail.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-white/90">
                {packageDetail.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={18} />
                    <span>{packageDetail.location}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>
                    {packageDetail.duration_days} Days /{" "}
                    {packageDetail.duration_nights} Nights
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Users size={18} />
                  <span>
                    Group: {packageDetail.group_size_min} -{" "}
                    {packageDetail.group_size_max}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left Content */}
          <div className="lg:col-span-2">
            {/* Description Card */}
            <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">
                Package Description
              </h2>
              <p className="leading-relaxed text-gray-600">
                {packageDetail.description}
              </p>
            </div>

            {/* Spiritual Highlights */}
            {packageDetail.spiritual_highlights && (
              <div className="p-8 mt-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
                <h2 className="mb-5 text-2xl font-bold text-gray-900">
                  Spiritual Highlights
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {packageDetail.spiritual_highlights
                    .split(",")
                    .map((highlight, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 border border-emerald-100 rounded-xl bg-emerald-50/40"
                      >
                        <Star className="text-emerald-600" size={18} />
                        <span className="font-medium text-gray-700">
                          {highlight.trim()}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky p-8 bg-white border border-gray-100 shadow-md rounded-2xl top-24">
              {/* Price */}
              <div className="pb-6 mb-6 border-b">
                <div className="text-sm text-gray-500">Package Price</div>

                <div className="flex items-end gap-3 mt-2">
                  <span className="text-3xl font-bold text-emerald-700">
                    {parseInt(packageDetail.price_current).toLocaleString(
                      "en-NG",
                      {
                        style: "currency",
                        currency: "NGN",
                      }
                    )}
                  </span>

                  {packageDetail.price_original && (
                    <span className="text-lg text-gray-400 line-through">
                      {parseFloat(
                        packageDetail.price_original
                      ).toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Info */}
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Category</span>
                  <span className="font-semibold capitalize">
                    {packageDetail.category}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Location</span>
                  <span className="font-semibold">
                    {packageDetail.location || "Saudi Arabia"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Duration</span>
                  <span className="font-semibold">
                    {packageDetail.duration_days}D /{" "}
                    {packageDetail.duration_nights}N
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Group Size</span>
                  <span className="font-semibold">
                    {packageDetail.group_size_min} -{" "}
                    {packageDetail.group_size_max}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => alert(`Booking ${packageDetail.name}...`)}
                className="w-full py-4 mt-8 text-lg font-semibold text-white transition-all duration-300 rounded-xl bg-emerald-700 hover:bg-emerald-800 hover:shadow-xl"
              >
                Book This Package
              </button>

              <p className="mt-4 text-xs text-center text-gray-400">
                Secure booking • Trusted service • 24/7 Support
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PackageDetail;
