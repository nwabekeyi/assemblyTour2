import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, Loader } from "lucide-react";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/auth/request-password-reset/",
        { email }
      );

      if (response.success) {
        toast.success("OTP sent to your email!");
        sessionStorage.setItem("reset_email", email);
        navigate("/verify-otp");
      }
    } catch (error) {
      toast.error(error.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full flex flex-col justify-center py-5 sm:px-6 lg:px-8 min-h-[calc(100vh-80px)]">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-extrabold text-center text-emerald-700">
          Forgot Password?
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email to receive a verification OTP
        </p>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="px-4 py-8 bg-gray-800 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-white">
                Email Address
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-3 py-2 pl-10 bg-white border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-900"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send OTP
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Login
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPasswordPage;
