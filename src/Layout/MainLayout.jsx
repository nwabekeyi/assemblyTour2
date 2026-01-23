import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/sharedComponents/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/sharedComponents/Footer";

function MainLayout() {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/signup";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {!isAuthPage && <Hero />}

      {/* Main Content */}
      <div
        className={
          isAuthPage
            ? "flex flex-1 flex-col items-center justify-center"
            : "pt-[100vh]"
        }
      >
        <Outlet />

        {/* 🔹 Small auth footer */}
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
