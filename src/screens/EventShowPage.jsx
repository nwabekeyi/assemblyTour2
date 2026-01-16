import { Calendar, Clock, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";
import eventStore from "../store/event.store";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"

function EventShowPage() {
  // const { getEvent, upcommingevent, event, upcommingEvents } = eventStore();

  // useEffect(() => {
  //   getEvent();
  //   upcommingevent();
  // }, []);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("current");
const event=[
  {
    "_id": "1",
    "title": "Summer Music Festival 2024",
    "date": "July 15-17, 2024",
    "time": "Gates open at 2 PM",
    "location": "Central Park, NYC",
    "image": "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    "description": "Join us for a three-day celebration of music, food, and fun in the heart of New York City. Featuring top artists from around the world, food trucks, and family-friendly activities.",

    "rating": 4.8

    }
    
]
const upcommingevents=[
  {
    "_id": "2",
    "title": "Art & Wine Festival",
    "date": "August 10-12, 2024",
    "time": "10 AM - 8 PM",
    "location": "Downtown LA",
    "image": "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
    "description": "Experience the best of local art and wine at our annual festival. Enjoy live music, art exhibits, and wine tastings from top vineyards.",
    "rating": 4.5
    },
  ]


  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <main className="min-h-screen">
     

      {/* Events Section */}
      <section className="px-4 py-16 md:px-8">
        <h2 className="mb-8 text-3xl font-bold text-center">Festival Events</h2>
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("current")}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              activeTab === "current"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Current Events
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              activeTab === "upcoming"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Upcoming Events
          </button>
        </div>
        <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-2">
          {(activeTab === "current" ? [event] : upcommingEvents || []).map(
            (eventItem, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg shadow-md"
              >
                <img
                  src={eventItem.image}
                  alt={eventItem.title}
                  className="object-cover w-full h-48"
                />
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold">{eventItem.title}</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{eventItem.date}</span>
                    </div>
                    {eventItem.time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{eventItem.time}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{eventItem.location}</span>
                    </div>
                  </div>
                  {/* <p className="mt-4 text-gray-600">{eventItem.description}</p> */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 mt-6 text-sm font-semibold text-white bg-blue-600 rounded-full"
                  >
                    <Link to={`/event/detail/:${event._id}`}>Learn More</Link>
                  </motion.button>
                  
                </div>
              </div>
            )
          )}
        </div>
      </section>
    </main>
  );
}

export default EventShowPage;
