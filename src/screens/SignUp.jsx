import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Loader, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function SignUp() {
  const navigate = useNavigate();

  const [redirect, setRedirect] = useState(false);
  const [phone, setPhone] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [loading, setLoading] = useState(false);

  const turnstileRef = useRef(null);

  // Environment variables from Vite
  const API_URL = import.meta.env.VITE_API_URL;
  const CLOUDFLARE_SITE_KEY = import.meta.env.VITE_CLOUDFLARE_SITE_KEY;

  // Navigate after successful signup
  useEffect(() => {
    if (redirect) navigate("/");
  }, [redirect, navigate]);

  // Dynamically load Cloudflare Turnstile script
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

    return () => {
      document.body.removeChild(script);
    };
  }, [CLOUDFLARE_SITE_KEY]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!turnstileToken) {
    //   alert("Please complete the Turnstile challenge.");
    //   return;
    // }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "register",
          phone,
          turnstileToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      // Registration successful
      alert("Registration successful! Your temp password: " + data.data.temp_password);
      setRedirect(true);
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <motion.div
        className="sm:mx-auto sm:w-full sm:max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-400">
          Sign Up
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
            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                placeholder="+2348012345678"
              />
            </div>

            {/* Turnstile Widget */}
            <div ref={turnstileRef} className="mt-4" />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-150 ease-in-out disabled:opacity-50"
              disabled={loading}
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
            <Link to="/login" className="font-medium text-emerald-400 hover:text-emerald-300">
              Login here <ArrowRight className="inline h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default SignUp;
