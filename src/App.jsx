import { Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./screens/homepage";
import LoginPage from "./screens/LogInPage";
import Blog from "./screens/Blog";
import Service from "./components/Service";
import ContactForm from "./components/sharedComponents/ContactForm";
import SignUp from "./screens/SignUp";
import AboutUs from "./components/AboutUs";
import DestinationPage from "./screens/DestinationPage";
import AdminDashboard from "./screens/AdminScreen/AdminDashboard";
import LoadingSpinner from "./components/Spinner/LoadingSpinner";
import { Toaster } from "react-hot-toast";
import DashBoardLayout from "./Layout/DashboardLayout"
// import useAuthStore from "./store/store"; // 🧩 Temporarily disabled state management
import Alluser from "./screens/AdminScreen/Alluser";
import Detail from "./screens/Detail";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import EventShowPage from "./screens/EventShowPage";
import EventDetailPage from "./screens/EventDetailPage";
import MainLayout from "./Layout/MainLayout";
import PackagesPage from "./screens/PackagesPage";
import DestinationDetail from "./components/Destination/DestinationDetail";
import TravelDashboard from "./components/Dashboard/TravelDashboard";
import Sidebar from "./screens/AdminScreen/Sidebar";

const ProtectedRoute = ({ element, condition, redirectTo = "/login" }) => {
  if (condition === undefined || condition === null) {
    return <Navigate to={redirectTo} />;
  }
  return condition ? element : <Navigate to={redirectTo} />;
};

function App() {
  // const { user, checkAuth, checkingAuth } = useAuthStore();

  // useEffect(() => {
  //   checkAuth();
  // }, [checkAuth]);

  // if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-[#F3F4F6] ">
        <Routes>
          {/* Auth Routes (Login, Signup) */}

          {/* Main Layout Routes */}
          <Route path="/" element={<MainLayout />}>
            {/* Public Routes */}
            <Route index element={<Homepage />} />
             <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/service" element={<Service />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/event" element={<EventShowPage />} />
            <Route path="/event/detail/:id" element={<EventDetailPage />} />
            <Route path="/destination" element={<DestinationPage />} />
            <Route path="/destination/:name" element={<DestinationDetail />} />
            <Route path="/detail/:id" element={<Detail />} />

            {/* Admin Routes (commented auth checks) */}
            {/* Admin Route */}
          </Route>
          <Route element={<DashBoardLayout />}>
               <Route
              path="/dashboard"
              element={<TravelDashboard />}
              // element={
              //   <ProtectedRoute
              //     element={<AdminDashboard />}
              //     condition={user?.role === "admin"}
              //   />
              // }
            />
            <Route
              path="/dashboard/users"
              element={<Alluser />}
              // element={
              //   <ProtectedRoute
              //     element={<Alluser />}
              //     condition={user?.role === "admin"}
              //   />
              // }
            />
          </Route>
        </Routes>
      </div>
      <ScrollToTop />
      <Toaster />
    </div>
  );
}

export default App;
