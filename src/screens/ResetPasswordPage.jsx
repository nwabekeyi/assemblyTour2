import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, Loader, CheckCircle, ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("reset_email");
    const storedOtp = sessionStorage.getItem("verified_otp");
    if (!storedEmail || !storedOtp) {
      toast.error("Please complete the previous steps.");
      navigate("/forgot-password");
    } else {
      setEmail(storedEmail);
      setOtp(storedOtp);
    }
  }, [navigate]);

  const passwordRequirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains number", met: /[0-9]/.test(password) },
  ];

  const isPasswordStrong = passwordRequirements.every((req) => req.met);
  const canSubmit = isPasswordStrong && password === confirmPassword && password.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
      } else if (!isPasswordStrong) {
        toast.error("Please meet all password requirements.");
      }
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        "/auth/reset-password/",
        { email, token: otp, password, password_confirm: confirmPassword }
      );

      if (response.success) {
        toast.success("Password reset successful! Redirecting to login...");
        sessionStorage.removeItem("reset_email");
        sessionStorage.removeItem("verified_otp");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      toast.error(error.message || "Failed to reset password. Please try again.");
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
          Reset Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create a new secure password for your account
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
            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-white">
                New Password
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-3 py-2 pl-10 pr-10 bg-white border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-900"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password Requirements */}
              {password.length > 0 && (
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-center text-xs">
                      {req.met ? (
                        <CheckCircle className="w-3 h-3 text-emerald-500 mr-2" />
                      ) : (
                        <div className="w-3 h-3 border border-gray-300 rounded-full mr-2" />
                      )}
                      <span className={req.met ? "text-emerald-600" : "text-gray-400"}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-white">
                Confirm New Password
              </label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full px-3 py-2 pl-10 pr-10 bg-white border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-gray-900"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="mt-1 text-xs text-red-500">Passwords do not match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !canSubmit}
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Resetting...
                </>
              ) : (
                <>
                  Reset Password
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

export default ResetPasswordPage;
