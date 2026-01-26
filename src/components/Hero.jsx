import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, Compass } from "lucide-react";
import axiosInstance from "../lib/axios.js";
import { useNavigate, useLocation } from "react-router-dom";

const Hero = () => {
  const [heroSlides, setHeroSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const fallbackSlides = [
    {
      title: "The Holy Kaaba in Makkah",
      description:
        "Experience the profound spirituality of Tawaf and the sacred rites of Umrah and Hajj in the heart of Islam.",
      image:
        "https://hajjumrahplanner.com/wp-content/uploads/2017/04/kaaba-1024x681.jpg",
    },
    {
      title: "Al-Masjid an-Nabawi in Madinah",
      description:
        "Visit the Prophet's Mosque and immerse yourself in the serene blessings of the holy city.",
      image:
        "https://cdn.britannica.com/40/126040-050-DD37C896/Prophet-Mosque-Medina-Saudi-Arabia.jpg",
    },
    {
      title: "Journey of Faith",
      description:
        "Pilgrims united in devotion, performing the timeless rituals of Hajj and Umrah in Saudi Arabia.",
      image:
        "https://video.cgtn.com/news/2022-07-11/Muslim-pilgrims-perform-Tawaf-around-Kaaba-1bAldidMo3m/video/3a9c186a493b48128c3f01e1d1449d0d.jpg",
    },
  ];

  // ✅ Determine if Hero should render
  const [showHero, setShowHero] = useState(() => {
    const width = window.innerWidth;
    return width >= 1024 || location.pathname === "/" || location.pathname === "";
  });

  // Listen for window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setShowHero(width >= 1024 || location.pathname === "/" || location.pathname === "");
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location.pathname]);

  // Fetch slides (hooks always run, logic inside useEffect)
  useEffect(() => {
    if (!showHero) {
      setLoading(false);
      return;
    }

    const fetchSlides = async () => {
      try {
        const res = await axiosInstance.get("/home-content/");
        const slides = res.data?.hero_slides || [];
        setHeroSlides(slides.length ? slides : fallbackSlides);
      } catch (err) {
        console.error("Failed to fetch hero slides:", err);
        setHeroSlides(fallbackSlides);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, [showHero]);

  // Slide navigation
  const nextSlide = () => {
    if (isTransitioning || heroSlides.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const prevSlide = () => {
    if (isTransitioning || heroSlides.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  // Auto-play
  useEffect(() => {
    if (!heroSlides.length) return;
    const interval = isAutoPlaying ? setInterval(nextSlide, 5000) : null;
    return () => interval && clearInterval(interval);
  }, [isAutoPlaying, currentIndex, heroSlides.length]);

  if (!showHero || loading) return null;

  const currentSlide = heroSlides[currentIndex];

  return (
    <section className="absolute top-0 left-0 w-full h-screen min-h-[600px] max-h-[800px] overflow-hidden">
      {/* Carousel Images */}
      <div className="relative w-full h-full">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${
              index === currentIndex
                ? "opacity-100 transform translate-x-0"
                : index < currentIndex
                ? "opacity-0 transform -translate-x-full"
                : "opacity-0 transform translate-x-full"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title || "Hero slide"}
              className="object-cover w-full h-full"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="container px-6 mx-auto lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-4 py-2 mb-6 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
              <span className="w-2 h-2 mr-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-white">
                Your Spiritual Pilgrimage Awaits
              </span>
            </div>

            <h1 className="mb-4 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              {currentSlide.title}
            </h1>

            <p className="max-w-lg mb-8 text-xl leading-relaxed md:text-2xl text-white/90">
              {currentSlide.body || currentSlide.description}
            </p>

            <div className="flex flex-col gap-4 mb-12 sm:flex-row">
              <button
                onClick={() => navigate("/packages")}
                className="flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-500 transform rounded-xl shadow-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 hover:scale-105 hover:shadow-emerald-500/40"
              >
                <Compass size={20} className="mr-2" />
                Explore Packages
              </button>
            </div>

            <div className="flex flex-wrap gap-8">
              <div className="text-white">
                <div className="text-2xl font-bold">10,000+</div>
                <div className="text-white/70">Satisfied Pilgrims</div>
              </div>
              <div className="text-white">
                <div className="text-2xl font-bold">99%</div>
                <div className="text-white/70">Spiritual Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute flex items-center justify-center w-12 h-12 text-white transition-all duration-300 transform -translate-y-1/2 border rounded-full left-0 top-1/2 bg-white/1 hover:bg-white/20 hover:backdrop-blur-sm border-white/20 hover:scale-110"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute flex items-center justify-center w-12 h-12 text-white transition-all duration-300 transform -translate-y-1/2 border rounded-full right-0 top-1/2 bg-white/1 hover:bg-white/20 hover:backdrop-blur-sm border-white/20 hover:scale-110"
      >
        <ChevronRight size={24} />
      </button>

      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute flex items-center justify-center w-10 h-10 text-white transition-all duration-300 border rounded-full top-8 right-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border-white/20"
      >
        {isAutoPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      {/* Indicators */}
      <div className="absolute flex items-center space-x-4 transform -translate-x-1/2 bottom-8 left-1/2">
        <div className="flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
        <div className="flex items-center space-x-2 text-sm text-white">
          <span className="font-medium">{String(currentIndex + 1).padStart(2, "0")}</span>
          <span className="text-white/50">/</span>
          <span className="text-white/50">{String(heroSlides.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
