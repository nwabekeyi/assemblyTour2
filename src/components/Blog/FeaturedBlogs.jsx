import { CiHeart } from "react-icons/ci";
import { FaRegCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FeaturedBlogs = ({ blogs = [] }) => {
  if (!blogs || blogs.length === 0) return null; // Don't render if no blogs

  return (
    <section className="container py-16 mx-auto">
      <h2 className="px-5 mb-10 text-3xl font-bold text-gray-800 md:text-4xl">
        Featured Pilgrimage Insights
      </h2>
      <div className="grid gap-8 px-5 mx-auto lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {blogs.map((blog) => (
          <Link to={`/blog/${blog.slug}`} key={blog.id}>
            <div className="overflow-hidden transition-all duration-300 bg-white rounded-2xl shadow-lg hover:shadow-2xl">
              <div className="flex items-center justify-between px-4 pt-4 text-sm text-gray-500">
                <span>{new Date(blog.published_at).toLocaleDateString()}</span>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <CiHeart className="text-xl text-gray-600" />
                    <span>{blog.likes_count || 0}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRegCommentAlt className="text-lg text-gray-600" />
                    <span>{blog.comments_count || 0}</span>
                  </span>
                </div>
              </div>

              {/* Placeholder Image */}
              <div className="relative overflow-hidden">
                <motion.img
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  src={blog.cover_image_url}
                  alt={blog.title}
                  className="object-cover w-full h-64"
                />
                <span className="absolute px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-full bottom-4 left-4">
                  Pilgrimage
                </span>
              </div>

              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-gray-800">{blog.title}</h3>
                <p className="mt-1 text-sm font-medium text-gray-500">
                  By {blog.author || "Admin"}
                </p>
                <p className="text-gray-600 line-clamp-3 mt-2">{blog.excerpt}</p>
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
