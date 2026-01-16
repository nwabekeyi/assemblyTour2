import { CiHeart } from "react-icons/ci";
import { FaRegCommentAlt } from "react-icons/fa";
import {Link} from "react-router-dom"
import { motion } from "framer-motion";

const FeaturedBlogs = () => {
  const blogs = [
    {
      _id: "1",
      title: "Step-by-Step Guide to Performing Umrah",
      subdescription: "A detailed walkthrough of the sacred rites of Umrah, from Ihram to Tawaf and Sa'i.",
      image: "https://thumbs.dreamstime.com/b/high-angle-view-vast-congregation-muslim-pilgrims-white-ihram-garments-performing-tawaf-around-kaaba-grand-mosque-makkah-423485818.jpg",
      category: "Umrah Guide",
      date: "2025-12-15",
      likeCount: 450,
      commentCount: 62,
      user: { name: "Sheikh Ahmed" }
    },
    {
      _id: "2",
      title: "The Spiritual Significance of Hajj",
      subdescription: "Understanding the profound meaning behind the pillars of Hajj and its impact on the soul.",
      image: "https://d3i6fh83elv35t.cloudfront.net/static/2024/06/2024-06-15T090737Z_953939996_RC2GB8ALFUNF_RTRMADP_3_SAUDI-HAJ-1024x678.jpg",
      category: "Hajj Insights",
      date: "2025-12-10",
      likeCount: 380,
      commentCount: 48,
      user: { name: "Dr. Fatima Ali" }
    },
    {
      _id: "3",
      title: "Visiting the Prophet's Mosque in Madinah",
      subdescription: "Tips and etiquettes for a blessed ziyarah to Al-Masjid an-Nabawi and Rawdah Mubarak.",
      image: "https://zamzam-blog.s3.eu-west-1.amazonaws.com/wp-content/uploads/2022/06/Green-Dome-840x450.jpg",
      category: "Madinah",
      date: "2025-12-05",
      likeCount: 520,
      commentCount: 79,
      user: { name: "Imam Hassan" }
    },
  ];

  return (
    <section className="container py-16 mx-auto">
      <h2 className="px-5 mb-10 text-3xl font-bold text-gray-800 md:text-4xl">
        Featured Pilgrimage Insights
      </h2>
      <div className="grid gap-8 px-5 mx-auto lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {blogs.map((blog) => (
          <Link to={`/blog/${blog._id}`} key={blog._id}>
            <div className="overflow-hidden transition-all duration-300 bg-white rounded-2xl shadow-lg hover:shadow-2xl">
              <div className="flex items-center justify-between px-4 pt-4 text-sm text-gray-500">
                <span>{blog.date}</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <CiHeart className="text-xl text-gray-600" />
                    <span>{blog.likeCount}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRegCommentAlt className="text-lg text-gray-600" />
                    <span>{blog.commentCount}</span>
                  </span>
                </div>
              </div>

              <div className="relative overflow-hidden">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                  src={blog.image}
                  alt={blog.title}
                  className="object-cover w-full h-64"
                />
                <span className="absolute px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-full bottom-4 left-4">
                  {blog.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-800">
                  {blog.title}
                  <p className="mt-1 text-sm font-medium text-gray-500">By {blog.user.name}</p>
                </h3>
                <p className="text-gray-600 line-clamp-3">
                  {blog.subdescription}
                </p>
                <p className="mt-4 text-emerald-600 font-medium hover:text-emerald-700">
                  Read More →
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBlogs;