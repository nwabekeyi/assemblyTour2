// DestinationPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Hero from "../components/Hero";
import DestinationDetail from "../components/Destination/DestinationDetail";

const destinations = [
  {
    id: 1,
    name: "Paris, France",
    category: "City",
    image: "assets/omo1.jpg",
    description: "The city of lights and romance, featuring the Eiffel Tower.",
    adminPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    date: "December 3, 2024",
    postedTime: "3 min ago",
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    category: "City",
    image: "assets/omo1.jpg",
    description: "A bustling city blending tradition and modernity.",
    adminPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    date: "December 2, 2024",
    postedTime: "1 hour ago",
  },
  {
    id: 3,
    name: "Bali, Indonesia",
    category: "Beach",
    image: "assets/omo1.jpg",
    description: "A tropical paradise with stunning beaches and temples.",
    adminPhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    date: "November 30, 2024",
    postedTime: "2 days ago",
  },
  {
    id: 4,
    name: "New York, USA",
    category: "City",
    image: "assets/omo1.jpg",
    description: "The city that never sleeps, home to iconic landmarks.",
    adminPhoto: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
    date: "November 29, 2024",
    postedTime: "3 days ago",
  },
  {
    id: 5,
    name: "Cape Town, South Africa",
    category: "Adventure",
    image: "assets/omo1.jpg",
    description: "A vibrant city with breathtaking landscapes.",
    adminPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    date: "November 28, 2024",
    postedTime: "4 days ago",
  },
];

const categories = ["All", "City", "Beach", "Adventure"];

const articles = [
  {
    title: "Top 10 Beaches to Visit in 2024",
    snippet: "Explore the most breathtaking beaches around the globe.",
    date: "December 1, 2024",
  },
  {
    title: "City Escapes: A Guide to Urban Adventures",
    snippet: "Discover the hidden gems in the world's busiest cities.",
    date: "November 25, 2024",
  },
  {
    title: "Adventurous Destinations for Thrill Seekers",
    snippet: "Push your limits with these adrenaline-pumping locations.",
    date: "November 20, 2024",
  },
];

function DestinationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [engagement, setEngagement] = useState(
    destinations.map(() => ({
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 50),
      views: Math.floor(Math.random() * 1000) + 100,
    }))
  );

  const handleLike = (index) => {
    const updatedEngagement = [...engagement];
    updatedEngagement[index].likes += 1;
    setEngagement(updatedEngagement);
  };

  const handleComment = (index) => {
    const updatedEngagement = [...engagement];
    updatedEngagement[index].comments += 1;
    setEngagement(updatedEngagement);
  };

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
  };

  const handleBack = () => {
    setSelectedDestination(null);
  };

  const filteredDestinations = destinations.filter((destination) => {
    const matchesCategory =
      selectedCategory === "All" || destination.category === selectedCategory;
    const matchesQuery = destination.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  // Show detail view if destination is selected
  if (selectedDestination) {
    return (
      <DestinationDetail
        destination={selectedDestination}
        onBack={handleBack}
      />
    );
  }

  // Show main grid view
  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="font-serif text-2xl font-bold text-center">Discover Your Next Adventure</h1>
      <div className="container px-6 mx-auto mt-6">
        <div className="mb-4 text-center">
          <h2 className="text-lg font-semibold text-gray-700">Search what you want</h2>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <input
            type="text"
            placeholder="Search for destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="container grid grid-cols-1 gap-6 px-6 py-10 mx-auto lg:grid-cols-4">
        <div className="grid grid-cols-1 gap-6 lg:col-span-3 md:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer"
              onClick={() => handleDestinationClick(destination)}
            >
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="object-cover w-full h-48"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-2 py-1 text-xs font-medium text-gray-700 bg-white rounded-full bg-opacity-90">
                    {destination.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={destination.adminPhoto}
                    alt="Admin"
                    className="w-10 h-10 border border-gray-300 rounded-full"
                  />
                  <div className="ml-3">
                    <p className="text-sm text-gray-600">{destination.date}</p>
                    <p className="text-xs text-gray-400">{destination.postedTime}</p>
                  </div>
                </div>

                <h2 className="mb-2 text-xl font-semibold">
                  {destination.name}
                </h2>

                <p className="mb-4 text-sm text-gray-600">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div>
                    <span className="font-medium">{engagement[index].views}</span> views
                    &nbsp;|&nbsp;
                    <span className="ml-1">
                      {engagement[index].comments} comments
                    </span>
                  </div>
                  <button
                    className="text-blue-600 transition-colors hover:text-blue-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(index);
                    }}
                  >
                    Like ({engagement[index].likes})
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredDestinations.length === 0 && (
            <div className="py-12 text-center text-gray-600 col-span-full">
              <p className="text-lg">No destinations found.</p>
              <p className="text-sm">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>

        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h3 className="mb-4 text-xl font-semibold">Popular Articles</h3>
          <ul className="space-y-4">
            {articles.map((article, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0"
              >
                <h4 className="text-lg font-medium text-blue-500 cursor-pointer hover:underline">
                  {article.title}
                </h4>
                <p className="mt-1 text-sm text-gray-600">{article.snippet}</p>
                <p className="mt-2 text-xs text-gray-400">{article.date}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DestinationPage;