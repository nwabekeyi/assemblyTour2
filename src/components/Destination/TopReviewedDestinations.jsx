import { useState } from "react";
import { Star, MapPin, Eye, Calendar, Heart, Share2 } from "lucide-react";

// Sample data with Umrah & Hajj packages
const destinations = [
  {
    id: 1,
    name: 'Premium Umrah Package',
    location: 'Makkah & Madinah, Saudi Arabia',
    description: 'A complete premium Umrah experience including luxury hotels near Haram, guided rituals, and Ziyarat tours.',
    reviews: 842,
    rating: 4.9,
    image: '../../assets/umrah-1.jpg',
    author: {
      name: 'Ahmed Travel',
      avatar: '../../assets/hevi.jpg',
      posted: '2 days ago'
    },
    category: 'Umrah',
    price: '$2,499',
    duration: '10 Days',
    featured: true
  },
  {
    id: 2,
    name: 'Economy Umrah Package',
    location: 'Makkah & Madinah, Saudi Arabia',
    description: 'Affordable Umrah package with comfortable accommodation, transport, and full religious guidance.',
    reviews: 690,
    rating: 4.7,
    image: '../../assets/umrah-2.jpg',
    author: {
      name: 'Barakah Tours',
      avatar: '../../assets/hevi.jpg',
      posted: '1 week ago'
    },
    category: 'Umrah',
    price: '$1,599',
    duration: '8 Days',
    featured: true
  },
  {
    id: 3,
    name: 'Hajj VIP Package',
    location: 'Makkah, Mina, Arafat & Madinah',
    description: 'Exclusive Hajj package with premium tents, VIP transport, scholars guidance, and close Haram hotels.',
    reviews: 512,
    rating: 4.9,
    image: '../../assets/hajj-1.jpg',
    author: {
      name: 'Al-Haram Travels',
      avatar: '../../assets/hevi.jpg',
      posted: '3 days ago'
    },
    category: 'Hajj',
    price: '$9,999',
    duration: '20 Days',
    featured: true
  },
  {
    id: 4,
    name: 'Standard Hajj Package',
    location: 'Makkah, Mina, Arafat & Madinah',
    description: 'Well-organized Hajj journey with reliable accommodation, meals, transportation, and religious support.',
    reviews: 478,
    rating: 4.6,
    image: '../../assets/hajj-2.jpg',
    author: {
      name: 'Noor Hajj Services',
      avatar: '../../assets/hevi.jpg',
      posted: '5 days ago'
    },
    category: 'Hajj',
    price: '$6,499',
    duration: '18 Days',
    featured: false
  },
  {
    id: 5,
    name: 'Madinah Ziyarat Tour',
    location: 'Madinah, Saudi Arabia',
    description: 'Guided Ziyarat tour covering Masjid an-Nabawi, Quba Mosque, Uhud, and other historical sites.',
    reviews: 356,
    rating: 4.5,
    image: '../../assets/madinah-1.jpg',
    author: {
      name: 'Rahma Travels',
      avatar: '../../assets/hevi.jpg',
      posted: '1 day ago'
    },
    category: 'Ziyarat',
    price: '$499',
    duration: '3 Days',
    featured: false
  },
  {
    id: 6,
    name: 'Ramadan Umrah Special',
    location: 'Makkah & Madinah, Saudi Arabia',
    description: 'Experience the blessings of Umrah during Ramadan with Iftar near Haram and special night prayers.',
    reviews: 621,
    rating: 4.8,
    image: '../../assets/ramadan-umrah.jpg',
    author: {
      name: 'Taqwa Travels',
      avatar: '../../assets/hevi.jpg',
      posted: '4 days ago'
    },
    category: 'Umrah',
    price: '$3,299',
    duration: '12 Days',
    featured: true
  }
];

const TopReviewedDestinations = () => {
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const sortedDestinations = [...destinations]
    .sort((a, b) => b.reviews - a.reviews)
    .sort((a, b) => b.rating - a.rating);

  const totalPages = Math.ceil(sortedDestinations.length / itemsPerPage);
  const currentDestinations = sortedDestinations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const renderStars = (rating) => (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < Math.floor(rating)
              ? 'text-yellow-400 fill-current'
              : i < rating
              ? 'text-yellow-400 fill-current opacity-50'
              : 'text-gray-300'
          }
        />
      ))}
      <span className="ml-1 text-sm text-gray-600">({rating})</span>
    </div>
  );

  return (
    <section>
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
            🕋 Pilgrims’ Choice
          </div>
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Top Rated Umrah & Hajj Packages
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600">
            Trusted and highly reviewed pilgrimage packages to help you focus on your ibadah
          </p>
        </div>

        {/* Grid remains unchanged */}
      </div>
    </section>
  );
};

export default TopReviewedDestinations;
