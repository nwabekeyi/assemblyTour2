import {
  Menu,
  X,
  Home,
  Package,
  Building2,
  BookOpen,
  Phone,
  User,
  Globe,
  ChevronDown,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/store";
import usePackageStore from "../../store/package.store";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { packages, loading, fetchNavbarPackages } = usePackageStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [mobileVisible, setMobileVisible] = useState(true);

  const location = useLocation();
  const changedBackground = location.pathname === "/login" || location.pathname === "/signup";

  // Fetch packages on mount
  useEffect(() => {
    fetchNavbarPackages();
  }, []);

  // Desktop scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile scroll hide/show effect
  useEffect(() => {
    const handleMobileScroll = () => {
      const currentScrollY = window.scrollY;
      setMobileVisible(currentScrollY <= prevScrollY || currentScrollY <= 50);
      setPrevScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleMobileScroll);
    return () => window.removeEventListener("scroll", handleMobileScroll);
  }, [prevScrollY]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const closeAll = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const mainNavItems = [
    { label: "Home", path: "/", icon: <Home size={18} /> },
    { label: "Packages", dropdown: true, icon: <Package size={18} /> },
    { label: "Sacred Sites", path: "/sites", icon: <Building2 size={18} /> },
    { label: "Blog", path: "/blog", icon: <BookOpen size={18} /> },
    { label: "About Us", path: "/about", icon: <Info size={18} /> },
    { label: "Contact Us", path: "/contact", icon: <Phone size={18} /> },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <header
        className={`hidden lg:block sticky top-0 z-50 transition-all duration-500 font-serif ${
          isScrolled || changedBackground
            ? "bg-black/90 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-5">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group" onClick={closeAll}>
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl group-hover:scale-105 transition-transform">
                <Globe size={26} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-white">
                  Assembly Travels
                </div>
                <div className="text-xs text-emerald-300">Your Journey to Makkah & Madinah</div>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="flex items-center space-x-1">
              {mainNavItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.path ? (
                    <Link
                      to={item.path}
                      className="flex items-center gap-2 px-5 py-3 text-white font-medium hover:text-emerald-400 transition-colors group"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      <span className="absolute bottom-1 left-5 w-0 h-0.5 bg-emerald-400 group-hover:w-16 transition-all"></span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleDropdown("packages")}
                      className="flex items-center gap-2 px-5 py-3 text-white font-medium hover:text-emerald-400 transition-colors"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${activeDropdown === "packages" ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Auth */}
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl font-medium hover:shadow-lg transition"
                  >
                    <User size={18} />
                    {user.user?.name?.split(" ")[0] || "Profile"}
                  </Link>
                  <button onClick={handleLogout} className="text-white hover:text-red-400 font-medium">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-white hover:text-emerald-400 font-medium">
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl font-medium hover:shadow-lg transition text-white"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Packages Dropdown */}
        {activeDropdown === "packages" && (
          <div className="absolute left-0 w-full bg-white shadow-2xl border-t border-gray-100">
            <div className="container mx-auto px-6 py-10">
              {loading ? (
                <div className="text-center text-gray-500">Loading packages...</div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Umrah Packages */}
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-700 mb-6">Umrah Packages</h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      {packages.umrah.map((pkg) => (
                        <Link
                          key={pkg.id}
                          to={`/packages/${pkg.id}`}  // 👈 Updated to use ID
                          className="p-5 rounded-xl hover:bg-emerald-50 transition group"
                          onClick={closeAll}
                        >
                          <div className="font-semibold text-gray-800 group-hover:text-emerald-700">{pkg.name}</div>
                          <div className="text-sm text-gray-600 mt-1">{pkg.type}</div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Hajj Packages */}
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-700 mb-6">Hajj Packages</h3>
                    <div className="grid gap-5">
                      {packages.hajj.map((pkg) => (
                        <Link
                          key={pkg.id}
                          to={`/packages/${pkg.id}`}  // 👈 Updated to use ID
                          className="p-5 rounded-xl hover:bg-emerald-50 transition group"
                          onClick={closeAll}
                        >
                          <div className="font-semibold text-gray-800 group-hover:text-emerald-700">{pkg.name}</div>
                          <div className="text-sm text-gray-600 mt-1">{pkg.type}</div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile Navbar */}
      <div className="lg:hidden">
        {/* Top Bar */}
        <div
          className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
            mobileVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div
            className={`w-full px-5 py-4 transition-all duration-500 ${
              isScrolled || changedBackground ? "bg-emerald-700 shadow-lg" : "bg-emerald-700"
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3" onClick={closeAll}>
                <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg">
                  <Globe size={22} className="text-emerald-600" />
                </div>
                <div className="text-xl font-bold text-white">Assembly Travels</div>
              </Link>

              {/* Mobile Menu Toggle */}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={28} className="text-white" /> : <Menu size={28} className="text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* Full-screen menu overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 bg-black z-40 flex flex-col">
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <nav className="space-y-1">
                {mainNavItems.map((item) => (
                  <div key={item.label}>
                    {item.path ? (
                      <Link
                        to={item.path}
                        className="flex items-center gap-4 px-5 py-4 text-lg font-medium text-white hover:bg-white/10 rounded-xl transition"
                        onClick={closeAll}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() => toggleDropdown("mobile-packages")}
                          className="w-full flex items-center justify-between px-5 py-4 text-lg font-medium text-white hover:bg-white/10 rounded-xl transition"
                        >
                          <div className="flex items-center gap-4">
                            {item.icon}
                            <span>{item.label}</span>
                          </div>
                          <ChevronDown
                            size={20}
                            className={`transition-transform text-white ${
                              activeDropdown === "mobile-packages" ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {activeDropdown === "mobile-packages" && (
                        <div className="px-6 py-4 space-y-6">
                          {loading ? (
                            <div className="text-white text-center">Loading packages...</div>
                          ) : (
                            <>
                              <div>
                                <h4 className="text-emerald-400 font-semibold mb-3">Umrah Packages</h4>
                                {packages.umrah.map((pkg) => (
                                  <Link
                                    key={pkg.id}
                                    to={`/packages/${pkg.id}`}  // 👈 Updated to use ID
                                    className="block py-3 text-white/90 hover:text-emerald-400 transition"
                                    onClick={closeAll}
                                  >
                                    {pkg.name}
                                  </Link>
                                ))}
                              </div>
                              <div>
                                <h4 className="text-emerald-400 font-semibold mb-3">Hajj Packages</h4>
                                {packages.hajj.map((pkg) => (
                                  <Link
                                    key={pkg.id}
                                    to={`/packages/${pkg.id}`}  // 👈 Updated to use ID
                                    className="block py-3 text-white/90 hover:text-emerald-400 transition"
                                    onClick={closeAll}
                                  >
                                    {pkg.name}
                                  </Link>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      </>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Mobile Auth */}
            <div className="border-t border-gray-800 px-6 py-6 bg-black/90">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                      <User size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{user.user?.name}</div>
                      <div className="text-sm text-gray-400">Welcome back!</div>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="text-red-400 font-medium">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/login"
                    className="py-4 text-center font-semibold border border-gray-600 rounded-xl text-white hover:bg-white/10 transition"
                    onClick={closeAll}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="py-4 text-center font-semibold bg-emerald-600 rounded-xl text-white hover:bg-emerald-700 transition"
                    onClick={closeAll}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
