import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { KeyRound, ArrowLeft, Loader } from "lucide-react";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";

function VerifyOTPPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("reset_email");
    if (!storedEmail) {
      toast.error("Please start the password reset process again.");
      navigate("/forgot-password");
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/auth/verify-password-reset-otp/",
        { email, token: otp }
      );

      if (response.success) {
        toast.success("OTP verified successfully!");
        sessionStorage.setItem("verified_otp", otp);
        navigate("/reset-password");
      }
    } catch (error) {
      toast.error(error.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await axiosInstance.post("/auth/request-password-reset/", { email });
      toast.success("New OTP sent to your email!");
    } catch (error) {
      toast.error(error.message || "Failed to resend OTP. Please try again.");
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
          Verify OTP
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the 6-digit code sent to {email || "your email"}
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
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <KeyRound className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="block w-full px-3 py-2 pl-10 bg-white border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-900 text-center tracking-widest"
                  placeholder="000000"
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">
                OTP is valid for 10 minutes
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Verify OTP
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleResendOTP}
              disabled={loading}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-500"
            >
              Resend OTP
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

export default VerifyOTPPage;