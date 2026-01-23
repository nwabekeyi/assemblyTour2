import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Phone, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

const Cta = () => {
  const backgroundImages = [
    "https://images.unsplash.com/photo-1518709371377-6b3c061a9a2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Kaaba at night
    "https://images.unsplash.com/photo-1583425425505-9f91d1e3351b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Prophet's Mosque
    "https://images.unsplash.com/photo-1622039192030-75b8f3c0e4ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80", // Tawaf aerial
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-20 overflow-hidden lg:py-28">
      {/* Background with overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/95 to-teal-900/85"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-48 h-48 rounded-full -top-24 -right-24 bg-emerald-500/20 blur-3xl"></div>
        <div className="absolute w-48 h-48 rounded-full -bottom-24 -left-24 bg-teal-500/20 blur-3xl"></div>
        <div className="absolute w-64 h-64 transform -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-green-500/10 blur-3xl"></div>
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 mb-6 border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
                <MessageCircle size={16} className="mr-2 text-emerald-300" />
                <span className="text-sm font-semibold text-white">Your Spiritual Journey Awaits</span>
              </div>

              {/* Main Heading */}
              <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Ready to Perform{' '}
                <span className="text-transparent bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text">
                  Umrah or Hajj?
                </span>
              </h2>

              {/* Description */}
              <p className="max-w-2xl mb-8 text-xl leading-relaxed md:text-2xl text-white/90">
                Let us help you fulfill this blessed pillar of Islam. Our experienced team will guide you every step of the way for a peaceful and rewarding pilgrimage to Makkah and Madinah.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 mb-8 lg:justify-start">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-300">50,000+</div>
                  <div className="text-sm text-white/70">Pilgrims Served</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-300">20+</div>
                  <div className="text-sm text-white/70">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-300">24/7</div>
                  <div className="text-sm text-white/70">Dedicated Support</div>
                </div>
              </div>
            </div>

            {/* CTA Cards */}
            <div className="space-y-6">
              {/* Main CTA Card */}
              <div className="p-8 transition-all duration-500 border bg-white/10 backdrop-blur-lg rounded-2xl border-white/20 hover:border-emerald-300/50 group">
                <div className="flex items-start mb-4 space-x-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition-transform duration-300 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl group-hover:scale-110">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-2xl font-bold text-white">Begin Your Pilgrimage</h3>
                    <p className="text-white/80">Receive personalized Umrah & Hajj guidance from our expert advisors.</p>
                  </div>
                </div>

                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center w-full px-8 py-4 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 rounded-xl group-hover:scale-105 hover:shadow-emerald-500/25"
                >
                  Plan My Umrah/Hajj
                  <ArrowRight size={20} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Secondary Options */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Link 
                  to="/consultation" 
                  className="p-4 text-center transition-all duration-300 border bg-white/5 backdrop-blur-sm rounded-xl border-white/10 hover:border-white/30 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 transition-colors duration-300 rounded-lg bg-emerald-500/20 group-hover:bg-emerald-500/30">
                    <Calendar size={20} className="text-emerald-300" />
                  </div>
                  <div className="font-semibold text-white">Free Consultation</div>
                  <div className="text-sm text-white/60">30-min expert session</div>
                </Link>

                <Link 
                  to="/contact" 
                  className="p-4 text-center transition-all duration-300 border bg-white/5 backdrop-blur-sm rounded-xl border-white/10 hover:border-white/30 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 mx-auto mb-2 transition-colors duration-300 rounded-lg bg-green-500/20 group-hover:bg-green-500/30">
                    <Phone size={20} className="text-green-300" />
                  </div>
                  <div className="font-semibold text-white">Call Us Now</div>
                  <div className="text-sm text-white/60">+234 802 303 2496</div>
                </Link>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-6 text-sm text-white/60">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>No commitment required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Licensed & trusted agency</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Best value packages</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cta;