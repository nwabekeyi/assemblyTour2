import { useState, useEffect, useRef } from "react";
import { IoMdHappy, IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CustomerCard from "./CustomerCard";
import useTestimonialStore from "../../store/testimonial.store";

function Customer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const scrollContainerRef = useRef(null);
  
  const { testimonials, fetchTestimonials, loading } = useTestimonialStore();
  const testimonialsList = Array.isArray(testimonials) ? testimonials : [];

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

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
      prevIndex >= testimonialsList.length - cardsToShow ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? testimonialsList.length - cardsToShow : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Show loading state
  if (loading && testimonialsList.length === 0) {
    return (
      <div className="w-full py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="w-[95%] mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </div>
    );
  }

  const visibleCards = testimonialsList.slice(currentIndex, currentIndex + cardsToShow);

  return (
    <div className="w-full py-12 md:py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="w-[95%] mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 md:w-12 h-1 bg-gradient-to-r from-emerald-400 to-teal-600 rounded-full mr-4"></div>
            <IoMdHappy className="text-3xl md:text-4xl text-emerald-500 mr-4" />
            <div className="w-8 md:w-12 h-1 bg-gradient-to-r from-teal-600 to-emerald-400 rounded-full"></div>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3 md:mb-4">
            What Our Pilgrims Say About Us
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-lg text-gray-600">
            Hear from those who have completed their sacred Umrah or Hajj journey with us. 
            Their heartfelt experiences reflect the spiritual care and support we provide.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-[95%] mx-auto max-w-7xl">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="hidden sm:flex absolute left-0 z-10 p-2 md:p-3 transition-all duration-300 transform -translate-x-2 md:-translate-x-4 -translate-y-1/2 bg-white rounded-full shadow-lg top-1/2 hover:shadow-xl hover:scale-110 group"
          >
            <IoIosArrowBack className="text-xl md:text-2xl text-gray-600 group-hover:text-emerald-600 transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden sm:flex absolute right-0 z-10 p-2 md:p-3 transition-all duration-300 transform translate-x-2 md:translate-x-4 -translate-y-1/2 bg-white rounded-full shadow-lg top-1/2 hover:shadow-xl hover:scale-110 group"
          >
            <IoIosArrowForward className="text-xl md:text-2xl text-gray-600 group-hover:text-emerald-600 transition-colors" />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex flex-nowrap md:flex-wrap items-stretch justify-center gap-4 md:gap-6 overflow-x-hidden transition-all duration-500 ease-in-out"
          >
            {visibleCards.map((item) => (
              <CustomerCard
                key={item.id}
                url={item.author_image}
                name={item.author_name}
                description={item.content}
              />
            ))}
          </div>

          {/* Dots Indicator */}
          {testimonialsList.length > cardsToShow && (
            <div className="flex items-center justify-center mt-6 md:mt-8 space-x-2 md:space-x-3">
              {Array.from({ length: testimonialsList.length - cardsToShow + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 w-6 md:w-8"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Customer;