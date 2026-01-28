import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import axiosInstance from '../../lib/axios';
import { toast } from "react-hot-toast";
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const socialIconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const listItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    },
    hover: {
      x: 10,
      color: "#10B981",
      transition: {
        duration: 0.2
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.4)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const socialLinks = [
    { icon: FaFacebookF, color: "#1877F2", link: "https://facebook.com/assemblytravels" },
    { icon: FaInstagram, color: "#E4405F", link: "https://instagram.com/assemblytravels" },
    { icon: FaWhatsapp, color: "#25D366", link: "https://wa.me/2348023032496" },
    { icon: FaLinkedinIn, color: "#0077B5", link: "https://linkedin.com/company/assemblytravels" },
  ];

  const quickLinks = ["Home", "About Us", "Umrah Packages", "Hajj Packages", "Ziyarah Sites", "Blog", "Contact Us"];

  const contactInfo = [
    { icon: FaPhoneAlt, text: "+234 802 303 2496" },
    { icon: FaEnvelope, text: "info@assemblytravels.com" },
    { icon: FaMapMarkerAlt, text: "Lagos, Nigeria" },
  ];

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/newsletter/subscribe/", { email });

      if (res.success) {
        toast.success(res.message || "Subscribed successfully!");
        setEmail(""); // reset input
      } else {
        toast.error(res.message || "Failed to subscribe. Try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Subscription failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="container mx-auto px-4 py-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Assembly Travels
            </h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Your trusted partner for sacred Umrah and Hajj journeys to Makkah and Madinah. 
              We provide complete spiritual care, comfort, and guidance every step of the way.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover="hover"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gradient-to-br hover:from-emerald-500 hover:to-teal-600 transition-all duration-300"
                >
                  <social.icon style={{ color: social.color }} size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-semibold mb-6 text-emerald-400">Quick Links</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  variants={listItemVariants}
                  whileHover="hover"
                  className="flex items-center text-gray-300 hover:text-emerald-400 cursor-pointer transition-colors"
                >
                  <FaArrowRight size={12} className="mr-3" />
                  {link}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-semibold mb-6 text-emerald-400">Contact Us</h4>
            <ul className="space-y-5">
              {contactInfo.map((info, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="flex items-start text-gray-300"
                >
                  <info.icon size={18} className="mr-4 text-emerald-400 flex-shrink-0 mt-1" />
                  <span>{info.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div>
            <h4 className="text-xl font-semibold mb-6 text-emerald-400">Stay Updated</h4>
            <p className="text-gray-300 mb-6">
              Subscribe for exclusive Umrah & Hajj offers, spiritual tips, and important announcements.
            </p>
            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="px-5 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400"
                required
              />
              <motion.button
                type="submit"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Subscribing..." : "Subscribe"}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Border & Copyright */}
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-gray-800"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-gray-400"
          >
            © {new Date().getFullYear()} Assembly Travels and Tours Limited. All rights reserved. | Ministry-Approved.
          </motion.p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;