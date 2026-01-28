import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // assuming lucide-react installed
import DashboardSidebar from "../components/sharedComponents/Sidebar";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setSidebarOpen(false); // auto-close sidebar on desktop resize
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // initial check
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <div className="hidden md:block md:w-64 lg:w-72 flex-shrink-0">
          <DashboardSidebar />
        </div>
      )}

      {/* Mobile Top Navbar + Sidebar Drawer */}
      {isMobile && (
        <>
          {/* Top Navbar */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 py-3 flex items-center justify-between">
            <Link to="/dashboard" className="text-xl font-bold text-emerald-700">
              Travel Dashboard
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </header>

          {/* Mobile Sidebar Drawer */}
          <div
            className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:hidden`}
          >
            <DashboardSidebar onClose={() => setSidebarOpen(false)} />
          </div>

          {/* Backdrop */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Spacer for mobile top navbar */}
        {isMobile && <div className="h-16" />}

        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto w-[100] md:w-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;