import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Loader, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import useAuthStore from "../store/store";

function SignUp() {
  const navigate = useNavigate();
  const { signup, loading } = useAuthStore();

  // ✅ only the 10 local digits
  const [phoneDigits, setPhoneDigits] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const turnstileRef = useRef(null);
  const inputRef = useRef(null);
  const CLOUDFLARE_SITE_KEY = import.meta.env.VITE_CLOUDFLARE_SITE_KEY;

  // -----------------------------
  // Cloudflare Turnstile
  // -----------------------------
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.render(turnstileRef.current, {
          sitekey: CLOUDFLARE_SITE_KEY,
          callback: (token) => setTurnstileToken(token),
          "error-callback": () => setTurnstileToken(""),
          theme: "dark",
        });
      }
    };

    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, [CLOUDFLARE_SITE_KEY]);

  // -----------------------------
  // Phone input logic
  // -----------------------------
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // digits only

    // ❌ block leading zero
    if (value.startsWith("0")) return;

    // ❌ max 10 digits
    if (value.length > 10) return;

    setPhoneDigits(value);
  };

  // -----------------------------
  // Submit
  // -----------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneDigits.length !== 10) return;

    const phone = `+234${phoneDigits}`;

    const result = await signup({
      phone,
      turnstileToken,
    });

    if (result?.success) {
      navigate("/login");
    }
  };

  const isValidPhone = phoneDigits.length === 10;

  return (
    <div className="flex flex-col w-full justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-700">
          Start your journey
        </h2>
      </motion.div>

      <motion.div
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Phone Number
              </label>

              <div className="mt-1 flex rounded-md shadow-sm">
                {/* Prefix */}
                <span
                  onClick={() => inputRef.current?.focus()}
                  className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-600 bg-gray-700 text-gray-300 text-sm cursor-text"
                >
                  +234
                </span>

                {/* Input */}
                <input
                  ref={inputRef}
                  type="tel"
                  required
                  value={phoneDigits}
                  onChange={handlePhoneChange}
                  placeholder="8012345678"
                  className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-r-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <p className="mt-1 text-xs text-gray-400">
                Enter 10-digit Nigerian number (no leading 0)
              </p>
            </div>

            {/* Turnstile */}
            <div ref={turnstileRef} className="mt-4" />

            <button
              type="submit"
              disabled={loading || !isValidPhone}
              className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" />
                  Sign Up
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-400 hover:text-emerald-300"
            >
              Login here <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default SignUp;
