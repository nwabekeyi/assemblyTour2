import { useState, useEffect } from "react";
import { Search, Flame, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import Loading from "../components/Spinner/Loading.jsx";
import useBlogStore from "../store/blog.store";
import Pagination from "../components/Pagination/PaginationComp.jsx";

function Blog() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);

  const { blogs, getAllBlogs, loading, error } = useBlogStore();

  useEffect(() => {
    getAllBlogs({
      page: currentPage,
      page_size: 12,
      search,
      sort: activeTab === "popular" ? "popular" : "latest",
    });
  }, [currentPage, search, activeTab]);

  const handleClickBlog = (slug) => {
    navigate(`/detail/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />

      {/* TOP FILTER BAR */}
      <section className="sticky top-0 z-40 bg-white border-b">
        <div className="flex flex-col gap-4 px-4 py-6 mx-auto max-w-7xl sm:flex-row sm:items-center sm:justify-between">

          {/* Tabs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("popular")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === "popular"
                  ? "bg-emerald-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Flame size={16} />
              Popular
            </button>

            <button
              onClick={() => setActiveTab("all")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition ${
                activeTab === "all"
                  ? "bg-emerald-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <BookOpen size={16} />
              All Articles
            </button>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full py-2.5 pl-10 pr-4 text-sm bg-gray-100 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <main className="px-4 py-12 mx-auto max-w-7xl">
        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : blogs.length === 0 ? (
          <div className="text-center text-gray-500">No articles found.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((post) => (
                <article
                  key={post.id}
                  onClick={() => handleClickBlog(post.slug)}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="object-cover w-full h-56 transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition">
                      {post.title}
                    </h2>

                    <p className="mb-5 text-gray-600 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.author_image_url}
                          alt={post.author_name}
                          className="w-9 h-9 rounded-full object-cover"
                        />
                        <div className="text-sm">
                          <p className="font-semibold text-gray-800">
                            {post.author_name}
                          </p>
                          <p className="text-gray-500">
                            {post.read_time} min read
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(blogs.length / 12)}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default Blog;
