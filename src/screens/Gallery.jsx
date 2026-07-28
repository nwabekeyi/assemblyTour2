import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Video, X } from "lucide-react";
import axiosInstance from "../lib/axios";

// Helper to convert YouTube URL to embed URL
const getYoutubeEmbedUrl = (url) => {
  if (!url) return null;
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
    /(?:https?:\/\/)?youtu\.be\/([^?]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  return null;
};

const isYoutubeUrl = (url) => url && /youtube\.com\/watch\?v=|youtu\.be\//.test(url);

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get("/gallery/");
        const items = response.data?.data || response.data || [];
        setGalleryItems(Array.isArray(items) ? items : []);
      } catch (err) {
        setError(err.message || "Failed to load gallery");
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <div className="w-full py-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container px-4 mx-auto text-center">
          <p className="text-lg text-gray-600">Loading gallery...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container px-4 mx-auto text-center">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-20 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <h1 className="mb-6 font-serif text-4xl font-bold text-gray-800 md:text-5xl">
            GALLERY
          </h1>
          <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
            Explore moments from our journeys through images and videos
          </p>
        </motion.div>

        {galleryItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500">No gallery items available at the moment.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {galleryItems.map((item) => {
              const isYoutube = isYoutubeUrl(item.url);
              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="relative group cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  onClick={() => setSelectedItem(item)}
                >
                  {item.media_type === "video" && item.thumbnail_url ? (
                    <div className="relative">
                      <img
                        src={item.thumbnail_url}
                        alt={item.description || item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Video size={48} className="text-white" />
                      </div>
                    </div>
                  ) : item.media_type === "video" ? (
                    <div className="relative">
                      <img
                        src={item.media_url || item.url}
                        alt={item.description || item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Video size={48} className="text-white" />
                      </div>
                    </div>
                  ) : isYoutube && item.thumbnail_url ? (
                    <div className="relative">
                      <img
                        src={item.thumbnail_url}
                        alt={item.description || item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Video size={48} className="text-white" />
                      </div>
                    </div>
                  ) : isYoutube ? (
                    <div className="relative">
                      <img
                        src={`https://img.youtube.com/vi/${item.url.match(/(?:v=|\/)([^&/?]+)/)?.[1]}/hqdefault.jpg`}
                        alt={item.description || item.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Video size={48} className="text-white" />
                      </div>
                    </div>
                  ) : item.media_type === "image" && item.media_url ? (
                    <img
                      src={item.media_url}
                      alt={item.description || item.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <img
                      src={item.url}
                      alt={item.description || item.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="absolute top-2 right-2">
                    {item.media_type === "video" ? (
                      <Video size={20} className="text-white bg-black/50 rounded p-1" />
                    ) : (
                      <ImageIcon size={20} className="text-white bg-black/50 rounded p-1" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 truncate">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
          >
            <X size={32} />
          </button>
          <div className="w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {selectedItem.media_type === "video" || isYoutubeUrl(selectedItem.url) ? (
              isYoutubeUrl(selectedItem.url) ? (
                <iframe
                  src={getYoutubeEmbedUrl(selectedItem.url)}
                  title={selectedItem.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={selectedItem.url}
                  controls
                  autoPlay
                  className="max-w-full max-h-full"
                  poster={selectedItem.thumbnail_url || selectedItem.media_url || selectedItem.url}
                />
              )
            ) : selectedItem.media_type === "image" && selectedItem.media_url ? (
              <img
                src={selectedItem.media_url}
                alt={selectedItem.description || selectedItem.title}
                className="max-w-full max-h-full"
              />
            ) : (
              <img
                src={selectedItem.url}
                alt={selectedItem.description || selectedItem.title}
                className="max-w-full max-h-full"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;