import { motion } from 'framer-motion';
import { MdOutlineAutoStories } from "react-icons/md";
import { FaMosque, FaHandsPraying, FaBookQuran, FaStar, FaAward, FaKaaba } from "react-icons/fa6";

function AboutUs({ experienceSection }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    }
  };

  const featureIconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const features = [
    {
      icon: FaKaaba,
      title: "Sacred Destinations",
      description: "Guided journeys to the holiest sites in Islam: Makkah and Madinah, for Umrah and Hajj.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: FaHandsPraying,
      title: "Spiritual Fulfillment",
      description: "Deeply enriching experiences that strengthen faith, devotion, and connection with Allah.",
      color: "from-green-500 to-lime-500"
    },
    {
      icon: FaBookQuran,
      title: "Expert Islamic Guidance",
      description: "Knowledgeable scholars and guides providing authentic insights and support throughout your pilgrimage.",
      color: "from-amber-500 to-orange-500"
    }
  ];

  // Fallback content if API doesn't provide images/text
  const mainImage = experienceSection?.image_one || "https://www.islamic-relief.org.uk/wp-content/uploads/2024/04/How-to-perform-Umrah-feature.jpg";
  const secondaryImage = experienceSection?.image_two || "https://zamzam-blog.s3.eu-west-1.amazonaws.com/wp-content/uploads/2022/06/Green-Dome-Madinah.jpg";
  const bodyText = experienceSection?.body || "We specialize in transforming your sacred pilgrimage into a profound spiritual experience. With decades of expertise and unwavering dedication to serving pilgrims, we ensure every aspect of your Umrah or Hajj is handled with care, authenticity, and devotion.";

  return (
    <section className="relative min-h-screen py-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute rounded-full top-10 left-10 w-72 h-72 bg-gradient-to-r from-emerald-100 to-teal-100 blur-3xl opacity-60"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute rounded-full bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-green-100 to-lime-100 blur-3xl opacity-40"
        />
      </div>

      <div className="container relative px-4 mx-auto">
        <div className="grid items-center grid-cols-1 gap-16 lg:gap-24 md:grid-cols-2">
          
          {/* Left: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full bg-gradient-to-r from-emerald-100 to-green-100 border-emerald-200"
            >
              <MdOutlineAutoStories className="text-emerald-600" />
              <span className="text-sm font-semibold tracking-wide uppercase text-emerald-700">
                Premium Pilgrimage Experience
              </span>
              <FaStar className="text-yellow-500" size={12} />
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={itemVariants}
              className="mb-6 text-5xl font-bold lg:text-6xl"
            >
              <span className="text-transparent bg-gradient-to-r from-gray-900 to-emerald-700 bg-clip-text">
                Why Choose Us
              </span>
              <br />
              <span className="text-transparent bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text">
                For Your Journey?
              </span>
            </motion.h2>

            {/* Body */}
            <motion.p
              variants={itemVariants}
              className="mb-10 text-lg leading-relaxed text-gray-600 lg:text-xl"
            >
              {bodyText}
            </motion.p>

            {/* Feature List */}
            <motion.div
              variants={containerVariants}
              className="space-y-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-6 p-4 transition-all duration-300 rounded-2xl hover:bg-white/50 backdrop-blur-sm group"
                >
                  <motion.div
                    variants={featureIconVariants}
                    initial="hidden"
                    whileInView="visible"
                    whileHover="hover"
                    viewport={{ once: true }}
                    className={`p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white shadow-lg group-hover:shadow-xl`}
                  >
                    <feature.icon size={24} />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="mb-2 text-xl font-bold text-gray-800 transition-colors group-hover:text-gray-900">
                      {feature.title}
                    </h4>
                    <p className="leading-relaxed text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Image Stack */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative w-full h-[600px]"
          >
            {/* Main Image */}
            <motion.div
              variants={imageVariants}
              whileHover="hover"
              className="absolute top-0 left-0 z-20 w-3/4 overflow-hidden shadow-2xl rounded-3xl"
            >
              <img
                src={mainImage}
                alt="Main Pilgrimage"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </motion.div>

            {/* Secondary Image */}
            <motion.div
              variants={imageVariants}
              whileHover="hover"
              transition={{ delay: 0.2 }}
              className="absolute right-0 z-10 w-2/3 overflow-hidden shadow-xl bottom-10 rounded-2xl"
            >
              <img
                src={secondaryImage}
                alt="Secondary Pilgrimage"
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
