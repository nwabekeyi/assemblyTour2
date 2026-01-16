// DestinationDetail.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeftIcon,
  MapPinIcon, 
  CalendarIcon, 
  ClockIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
  ShareIcon,
  BookmarkIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartSolidIcon,
  BookmarkIcon as BookmarkSolidIcon
} from '@heroicons/react/24/solid';

const DestinationDetail = ({ destination, onBack }) => {
    console.log("Destination data:", destination); // Debugging line
  const [activeImage, setActiveImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [engagement, setEngagement] = useState({
    likes: 245,
    comments: 89,
    views: 1567,
    shares: 34
  });
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'Travel Explorer',
      text: 'Amazing destination! The cultural experience was unforgettable.',
      time: '2 hours ago',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      user: 'Adventure Seeker',
      text: 'The landscapes are breathtaking. Highly recommended!',
      time: '1 day ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    }
  ]);

  const galleryImages = [
    destination.image,
    'https://images.unsplash.com/photo-157088421186-9d2b0c7aa1f4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-157088421186-9d2b0c7aa1f4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-157088421186-9d2b0c7aa1f4?w=800&h=600&fit=crop',
  ];

  const highlights = [
    {
      icon: '🏛️',
      title: 'Cultural Heritage',
      description: 'Rich historical sites and ancient traditions'
    },
    {
      icon: '🍴',
      title: 'Local Cuisine',
      description: 'Authentic traditional food experiences'
    },
    {
      icon: '🏨',
      title: 'Accommodation',
      description: 'Comfortable stays with local charm'
    },
    {
      icon: '🚗',
      title: 'Transportation',
      description: 'Easy access and local transport options'
    }
  ];

  const itinerary = [
    {
      day: 1,
      title: 'Arrival & Orientation',
      activities: [
        'Airport pickup and transfer to hotel',
        'Welcome briefing and orientation',
        'Traditional welcome dinner'
      ]
    },
    {
      day: 2,
      title: 'Cultural Immersion',
      activities: [
        'Morning market visit',
        'Traditional craft workshops',
        'Cultural performance in evening'
      ]
    },
    {
      day: 3,
      title: 'Nature & Adventure',
      activities: [
        'Guided nature walk',
        'Wildlife spotting',
        'Sunset photography session'
      ]
    }
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
    setEngagement(prev => ({
      ...prev,
      likes: prev.likes + (isLiked ? -1 : 1)
    }));
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: 'Current User',
        text: comment,
        time: 'Just now',
        avatar: "assets/omo1.jpg"
      };
      setComments([newComment, ...comments]);
      setComment('');
      setEngagement(prev => ({ ...prev, comments: prev.comments + 1 }));
    }
  };

  return (
    <div className="min-h-screen">
      <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Gallery */}
            <div className="mb-8">
              <div className="relative mb-4 overflow-hidden h-96 rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={galleryImages[activeImage]}
                    alt={destination.name}
                    className="object-cover w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>
                
                {/* Image Navigation */}
                <div className="absolute flex space-x-2 transform -translate-x-1/2 bottom-4 left-1/2">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        activeImage === index 
                          ? 'bg-white' 
                          : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="grid grid-cols-4 gap-2">
                {galleryImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`relative h-20 rounded-lg overflow-hidden transition-all ${
                      activeImage === index 
                        ? 'ring-2 ring-blue-500 ring-offset-2' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${destination.name} view ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Destination Info */}
            <div className="p-8 mb-8 bg-white shadow-sm rounded-2xl">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center mb-4 space-x-4">
                    <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
                      {destination.category}
                    </span>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <MapPinIcon className="w-4 h-4" />
                      <span className="text-sm">{destination.name.split(',')[1]?.trim()}</span>
                    </div>
                  </div>
                  
                  <h1 className="mb-2 text-4xl font-bold text-gray-900">
                    {destination.name}
                  </h1>
                  
                  <p className="mb-4 text-xl text-gray-600">
                    {destination.description}
                  </p>
                </div>
              </div>

              {/* Admin Info */}
              <div className="flex items-center p-4 mb-6 space-x-4 rounded-lg bg-gray-50">
                <img
                  src={destination.adminPhoto}
                  alt="Admin"
                  className="w-12 h-12 border border-gray-300 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900">Travel Guide</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>{destination.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{destination.postedTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Engagement Stats */}
              <div className="flex items-center justify-between py-4 border-t border-b border-gray-200">
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <EyeIcon className="w-4 h-4" />
                    <span>{engagement.views} views</span>
                  </div>
                  <button 
                    onClick={handleLike}
                    className={`flex items-center space-x-2 transition-colors ${
                      isLiked ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
                    }`}
                  >
                    {isLiked ? (
                      <HeartSolidIcon className="w-4 h-4" />
                    ) : (
                      <HeartIcon className="w-4 h-4" />
                    )}
                    <span>{engagement.likes} likes</span>
                  </button>
                  <div className="flex items-center space-x-2">
                    <ChatBubbleLeftIcon className="w-4 h-4" />
                    <span>{engagement.comments} comments</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShareIcon className="w-4 h-4" />
                    <span>{engagement.shares} shares</span>
                  </div>
                </div>
              </div>

              {/* Detailed Description */}
              <div className="mt-8">
                <h2 className="mb-4 text-2xl font-bold">About This Destination</h2>
                <div className="prose prose-lg text-gray-700">
                  <p className="mb-4">
                    Discover the magic of {destination.name}, a destination that offers 
                    unparalleled experiences for every type of traveler. From rich cultural 
                    heritage to stunning natural landscapes, this location promises memories 
                    that will last a lifetime.
                  </p>
                  <p className="mb-4">
                    Whether you're seeking adventure, relaxation, or cultural immersion, 
                    {destination.name.split(',')[0]} has something special to offer. Our 
                    carefully curated experiences ensure you get the most out of your visit.
                  </p>
                </div>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="p-8 mb-8 bg-white shadow-sm rounded-2xl">
              <h2 className="mb-6 text-2xl font-bold">What to Expect</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start p-4 space-x-4 transition-colors rounded-lg hover:bg-gray-50"
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <h3 className="mb-1 text-lg font-semibold">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Itinerary */}
            <div className="p-8 mb-8 bg-white shadow-sm rounded-2xl">
              <h2 className="mb-6 text-2xl font-bold">Sample Itinerary</h2>
              <div className="space-y-6">
                {itinerary.map((day, index) => (
                  <motion.div
                    key={day.day}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex space-x-6"
                  >
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                        <span className="text-sm font-bold text-blue-600">Day {day.day}</span>
                      </div>
                      {index < itinerary.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <h3 className="mb-3 text-xl font-semibold">{day.title}</h3>
                      <ul className="space-y-2">
                        {day.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-center space-x-3 text-gray-700">
                            <div className="w-2 h-2 bg-blue-400 rounded-full" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="p-8 bg-white shadow-sm rounded-2xl">
              <h2 className="mb-6 text-2xl font-bold">Comments ({comments.length})</h2>
              
              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <div className="flex space-x-4">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                    alt="Your avatar"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your thoughts about this destination..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows="3"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        disabled={!comment.trim()}
                        className="px-6 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4">
                    <img
                      src={comment.avatar}
                      alt={comment.user}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="p-4 rounded-lg bg-gray-50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{comment.user}</h4>
                          <span className="text-sm text-gray-500">{comment.time}</span>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="sticky p-6 bg-white shadow-sm rounded-2xl top-24">
              <div className="mb-6 text-center">
                <div className="mb-1 text-3xl font-bold text-gray-900">$1,299</div>
                <div className="text-gray-600">per person</div>
              </div>

              <div className="space-y-4">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        FirstName
                    </label>
                    <input className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500' placeholder='First Name'/>
                </div>
                <div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Select Dates
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>3 Days</option>
                    <option>5 Days</option>
                    <option>7 Days</option>
                    <option>10+ Days</option>
                  </select>
                  
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Travelers
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option>1 Traveler</option>
                    <option>2 Travelers</option>
                    <option>3 Travelers</option>
                    <option>4+ Travelers</option>
                  </select>
                </div>

                <button className="w-full px-4 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700">
                  Book This Trip
                </button>

                <div className="text-sm text-center text-gray-500">
                  Free cancellation up to 24 hours before
                </div>
              </div>
            </div>

            {/* Related Destinations */}
            {/* <div className="p-6 bg-white shadow-sm rounded-2xl">
              <h3 className="mb-4 text-lg font-semibold">Related Destinations</h3>
              <div className="space-y-4">
                {destinations.slice(0, 3).map((related, index) => (
                  <div key={index} className="flex space-x-3 cursor-pointer group">
                    <img
                      src={related.image}
                      alt={related.name}
                      className="object-cover w-16 h-16 rounded-lg"
                    />
                    <div>
                      <h4 className="font-medium transition-colors group-hover:text-blue-600">
                        {related.name}
                      </h4>
                      <p className="text-sm text-gray-600">{related.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;