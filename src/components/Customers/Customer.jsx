import { useState, useEffect, useRef } from "react";
import { IoMdHappy, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CustomerCard from "./CustomerCard";
import customerData from "./data";

function Customer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const scrollContainerRef = useRef(null);

  // Handle responsive card count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= customerData.length - cardsToShow ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? customerData.length - cardsToShow : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const visibleCards = customerData.slice(currentIndex, currentIndex + cardsToShow);

  return (
    <div className="container px-4 py-16 mx-auto bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full mr-4"></div>
          <IoMdHappy className="text-4xl text-emerald-500 mr-4" />
          <div className="w-12 h-1 bg-gradient-to-r from-teal-600 to-emerald-400 rounded-full"></div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
          What Our Pilgrims Say About Us
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          Hear from those who have completed their sacred Umrah or Hajj journey with us. 
          Their heartfelt experiences reflect the spiritual care and support we provide.
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative mx-auto max-w-7xl">
        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 p-3 transition-all duration-300 transform -translate-x-4 -translate-y-1/2 bg-white rounded-full shadow-lg top-1/2 hover:shadow-xl hover:scale-110 group"
        >
          <IoIosArrowBack className="text-2xl text-gray-600 group-hover:text-emerald-600 transition-colors" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 p-3 transition-all duration-300 transform translate-x-4 -translate-y-1/2 bg-white rounded-full shadow-lg top-1/2 hover:shadow-xl hover:scale-110 group"
        >
          <IoIosArrowForward className="text-2xl text-gray-600 group-hover:text-emerald-600 transition-colors" />
        </button>

        {/* Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex flex-row items-center justify-center gap-6 transition-all duration-500 ease-in-out"
        >
          {visibleCards.map((item) => (
            <CustomerCard
              key={item.id}
              url={item.imageurl}
              name={item.name}
              description={item.description}
            />
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center mt-8 space-x-3">
          {Array.from({ length: customerData.length - cardsToShow + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-emerald-500 to-teal-600 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Customer;