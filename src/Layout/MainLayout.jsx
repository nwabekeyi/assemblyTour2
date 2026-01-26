import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/sharedComponents/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/sharedComponents/Footer";

function MainLayout() {
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";

  // Track window width for responsive behavior
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine dynamic padding
  let paddingTop = "pt-0";

  if (!isAuthPage) {
    if (windowWidth >= 1024 || location.pathname === "/" || location.pathname === "") {
      // Hero is visible → always 90vh
      paddingTop = "pt-[95vh]";
    } else if (location.pathname !== "/" && location.pathname !== "") {
      // Small screen, not homepage → 10vh
      paddingTop = "pt-[10vh]";
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero only on large screens */}
      {!isAuthPage && windowWidth >= 1024 && <Hero />}

      {/* Main Content */}
      <div
        className={
          isAuthPage
            ? "flex flex-1 flex-col items-center justify-center"
            : paddingTop
        }
      >
        <Outlet />

        {/* Small auth footer */}
        {isAuthPage && (
          <div className="mt-6 text-center text-xs text-gray-700">
            <p className="font-medium text-emerald-700">
              Assembly Travels & Tours Limited
            </p>
            <p>Serving pilgrims on the sacred journey of Hajj & Umrah</p>
          </div>
        )}
      </div>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default MainLayout;
