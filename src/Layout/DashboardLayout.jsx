import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/sharedComponents/Sidebar";

function DashboardLayout() {
  const [activeItem, setActiveItem] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navbarHeight = 100;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative flex flex-1">
        {/* Sidebar */}
        <DashboardSidebar
        
        />

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main content */}
        <main
          className="flex-1 p-4 overflow-auto md:p-6"
          style={{
          
            marginLeft: window.innerWidth >= 768 ? 256 : 0, // md:ml-64
          }}
        >
          <div className="min-h-full p-4 shadow-sm rounded-2xl md:p-6">
            {/* Nested route will render here */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
