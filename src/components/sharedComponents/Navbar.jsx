import {
  Menu,
  X,
  Package,
  Building2,
  BookOpen,
  Phone,
  User,
  ChevronDown,
  Info,
  LogOut,
  HelpCircle,
  ChevronRight,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/store";
import usePackageStore from "../../store/package.store";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../public/assTourLogo.png";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { packages, loading, fetchNavbarPackages } = usePackageStore();

  const packagesUmrah = Array.isArray(packages?.umrah) ? packages.umrah : [];
  const packagesHajj = Array.isArray(packages?.hajj) ? packages.hajj : [];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [mobileVisible, setMobileVisible] = useState(true);

  const location = useLocation();
  const isHomePage = location.pathname === "/" || location.pathname === "";
  const changedBackground = location.pathname === "/login" || location.pathname === "/signup";

  // Fetch packages on mount
  useEffect(() => {
    fetchNavbarPackages();
  }, []);

  // Desktop scroll effect - only on home page
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

   // Click outside to close dropdown
   useEffect(() => {
     const handleClickOutside = (e) => {
       const packagesDropdown = document.getElementById("packages-dropdown");
       const packagesButton = document.getElementById("packages-dropdown-btn");
       const profileDropdown = document.getElementById("profile-dropdown");
       const profileButton = document.getElementById("profile-dropdown-btn");
       const mobileProfileDropdown = document.getElementById("mobile-profile-dropdown");
       const mobileProfileBtn = document.getElementById("mobile-profile-btn");

       // Check packages dropdown
       if (packagesButton && packagesButton.contains(e.target)) {
         return;
       }
       if (packagesDropdown && !packagesDropdown.contains(e.target)) {
         setActiveDropdown((prev) => (prev === "packages" ? null : prev));
       }

       // Check desktop profile dropdown
       if (profileButton && profileButton.contains(e.target)) {
         return;
       }
       if (profileDropdown && !profileDropdown.contains(e.target)) {
         setActiveDropdown((prev) => (prev === "profile" ? null : prev));
       }

       // Check mobile profile dropdown
       if (mobileProfileBtn && mobileProfileBtn.contains(e.target)) {
         return;
       }
       if (mobileProfileDropdown && !mobileProfileDropdown.contains(e.target)) {
         setActiveDropdown((prev) => (prev === "mobile-profile" ? null : prev));
       }
     };
     document.addEventListener("click", handleClickOutside);
     return () => document.removeEventListener("click", handleClickOutside);
   }, []);

   const handleLogout = () => {
     logout();
     closeAll();
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
    { label: "Sacred Sites", path: "/all-attractions", icon: <Building2 size={18} /> },
    { label: "Blog", path: "/blog", icon: <BookOpen size={18} /> },
    { label: "About Us", path: "/about", icon: <Info size={18} /> },
    { label: "Contact Us", path: "/contact", icon: <Phone size={18} /> },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <header
        className={`hidden lg:block fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-serif ${
          changedBackground
            ? "bg-black/95 backdrop-blur-md shadow-lg"
            : isHomePage
              ? isScrolled
                ? "bg-black/95 backdrop-blur-md shadow-lg"
                : "bg-transparent"
              : "bg-black/95 backdrop-blur-md shadow-lg"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group" onClick={closeAll}>
              <div className={`rounded-lg transition-all duration-500 ${
                isHomePage 
                  ? isScrolled 
                    ? "bg-white" 
                    : "bg-transparent" 
                  : "bg-white"
              }`}>
                <img 
                  src={logo}
                    alt="Assembly Travel"
                  className="h-[60px] w-auto object-contain"
                />
              </div>
              <span className={`font-bold text-xl transition-colors duration-500 ${
                isHomePage 
                  ? isScrolled 
                    ? "text-white" 
                    : "text-white" 
                  : "text-white"
              }`}>Assembly Travels</span>
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
                      <span className="whitespace-nowrap">{item.label}</span>
                      <span className="absolute bottom-1 left-5 w-0 h-0.5 bg-emerald-400 group-hover:w-16 transition-all"></span>
                    </Link>
                  ) : (
                    <button
                      id="packages-dropdown-btn"
                      onClick={() => toggleDropdown("packages")}
                      className="flex items-center gap-2 px-5 py-3 text-white font-medium hover:text-emerald-400 transition-colors"
                    >
                      {item.icon}
                      <span className="whitespace-nowrap">{item.label}</span>
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
                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button
                      id="profile-dropdown-btn"
                      onClick={() => toggleDropdown("profile")}
                      className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-white/10 transition"
                    >
                      {/* Profile Picture or Initial */}
                      {user.profile_picture ? (
                        <img
                          src={user.profile_picture}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover border-2 border-emerald-400"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                          <User size={16} className="text-white" />
                        </div>
                      )}
                      <span className="text-white font-medium hidden md:inline">
                        {user.first_name || user.username || "Profile"}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-white transition-transform ${activeDropdown === "profile" ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Profile Dropdown Menu */}
                    {activeDropdown === "profile" && (
                      <div
                        id="profile-dropdown"
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50"
                      >
                        {/* User Info Header */}
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-sm font-semibold text-gray-800">
                            {user.first_name || user.username || "User"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{user.email || ""}</p>
                        </div>

                        {/* Dropdown Options */}
                        <div className="py-1">
                          <Link
                            to="/dashboard/profile"
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 transition"
                          >
                            <User size={16} />
                            My Profile
                          </Link>
                          <Link
                            to="/support"
                            onClick={() => setActiveDropdown(null)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 transition"
                          >
                            <HelpCircle size={16} />
                            Support
                          </Link>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-100 my-1" />

                        {/* Logout */}
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
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
          <div id="packages-dropdown" className="absolute left-0 w-full bg-white shadow-2xl border-t border-gray-100">
            <div className="container mx-auto px-6 py-10">
              {loading ? (
                <div className="text-center text-gray-500">Loading packages...</div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Umrah Packages */}
                  <div>
                    <h3 className="text-2xl font-bold text-emerald-700 mb-6">Umrah Packages</h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      {packagesUmrah.map((pkg) => (
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
                      {packagesHajj.map((pkg) => (
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
              changedBackground
                ? "bg-gray-700 shadow-lg"
                : isHomePage
                  ? isScrolled
                    ? "bg-gray-700 shadow-lg"
                    : "bg-emerald-700"
                  : "bg-gray-700 shadow-lg"
            }`}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 group" onClick={closeAll}>
                <div className="bg-white p-0 rounded-lg">
                  <img 
                    src={logo}
                  alt="Assembly Travels"
                    className="h-10 w-auto object-contain"
                  />
                </div>
                <span className="text-white font-bold text-lg">Assembly Travel</span>
              </Link>

               {/* Mobile Menu Toggle */}
               <button type="button" onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}>
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
                                {packagesUmrah.map((pkg) => (
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
                                {packagesHajj.map((pkg) => (
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
                <div className="flex flex-col gap-4">
                  {/* Mobile Profile Dropdown Toggle */}
                  <div className="relative">
                    <button
                      id="mobile-profile-btn"
                      onClick={() => toggleDropdown("mobile-profile")}
                      className="flex items-center justify-between w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 transition"
                    >
                      <div className="flex items-center gap-4">
                        {user.profile_picture ? (
                          <img
                            src={user.profile_picture}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center">
                            <User size={20} className="text-white" />
                          </div>
                        )}
                        <div className="text-left">
                          <div className="font-semibold text-white">
                            {user.first_name || user.username || "User"}
                          </div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </div>
                      <ChevronRight
                        size={20}
                        className={`text-white transition-transform ${activeDropdown === "mobile-profile" ? "rotate-90" : ""}`}
                      />
                    </button>

                    {/* Mobile Profile Dropdown Menu */}
                  {activeDropdown === "mobile-profile" && (
                    <div
                      id="mobile-profile-dropdown"
                      className="absolute left-0 right-0 -top-2 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-[60]"
                    >
                        <Link
                          to="/dashboard/profile"
                          onClick={closeAll}
                          className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 transition"
                        >
                          <div className="flex items-center gap-3">
                            <User size={16} />
                            My Profile
                          </div>
                          <ChevronRight size={14} />
                        </Link>
                        <Link
                          to="/support"
                          onClick={closeAll}
                          className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 transition"
                        >
                          <div className="flex items-center gap-3">
                            <HelpCircle size={16} />
                            Support
                          </div>
                          <ChevronRight size={14} />
                        </Link>
                        <div className="border-t border-gray-100 my-1" />
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                        >
                          <LogOut size={16} />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>

                  <Link
                    to="/dashboard"
                    className="w-full py-3 text-center font-semibold bg-emerald-600 rounded-xl text-white hover:bg-emerald-700 transition"
                    onClick={closeAll}
                  >
                    Go to Dashboard
                  </Link>
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
