import { useState, useEffect } from "react";
import { Menu, Search, Home, BookOpen, Image } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import useBlogStore from "../store/blog.store.js";
import TimeDifference from "../components/sharedComponents/TimeDifference.jsx";
import useAuthStore from "../store/store.js";

import Loading from "../components/Spinner/Loading.jsx";

function Blog() {
  function getReadTime(content) {
    // Average reading speed is 200 words per minute
    const wordsPerMinute = 200;
    // Count words in the content
    const wordCount = content.split(/\s+/).length;
    // Calculate read time in minutes
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime;
  }

  const [active, setActive] = useState(0);

  // Example Hajj and Umrah related blogs
  const blog = [
    {
      "_id": "64a7f3f4e4b0c6b1f4e8c9a1",
      "title": "The Ultimate Guide to Performing Umrah",
      "subtitle": "Step-by-Step Guide for First-Time Pilgrims",
      "description": "Umrah is a spiritual journey that every Muslim dreams of. This guide walks you through the rituals, essential tips, and the best time to visit the holy cities.",
      "image": "https://images.unsplash.com/photo-1612893365260-ccab18f8f0b1",
      "user": { "name": "Ahmed Al-Farsi", "pic": "https://randomuser.me/api/portraits/men/32.jpg" },
      "createdAt": "2023-07-01T10:00:00Z"
    },
    {
      "_id": "64a7f3f4e4b0c6b1f4e8c9a2",
      "title": "Preparing for Hajj: What You Need to Know",
      "subtitle": "A Comprehensive Hajj Preparation Checklist",
      "description": "Hajj is a once-in-a-lifetime journey. Here’s your ultimate checklist to ensure you're fully prepared for the pilgrimage, including visa requirements and essential items to pack.",
      "image": "https://images.unsplash.com/photo-1559644635-e2b585b36d8b",
      "user": { "name": "Fatimah Al-Mansoor", "pic": "https://randomuser.me/api/portraits/women/44.jpg" },
      "createdAt": "2023-07-02T11:30:00Z"
    },
    {
      "_id": "64a7f3f4e4b0c6b1f4e8c9a3",
      "title": "The Spiritual Significance of Tawaf",
      "subtitle": "Understanding the Rituals of Tawaf During Hajj and Umrah",
      "description": "Tawaf is an integral part of both Hajj and Umrah rituals. This blog explains its significance, step-by-step process, and the spiritual benefits of performing Tawaf.",
      "image": "https://images.unsplash.com/photo-1612790132629-9ba6d0738e1b",
      "user": { "name": "Ali Karim", "pic": "https://randomuser.me/api/portraits/men/65.jpg" },
      "createdAt": "2023-07-03T12:00:00Z"
    },
    {
      "_id": "64a7f3f4e4b0c6b1f4e8c9a4",
      "title": "What to Expect During Arafat Day",
      "subtitle": "The Most Sacred Day of Hajj",
      "description": "Arafat Day is one of the most important days in the Islamic calendar. In this post, we discuss the rituals of Arafat, the significance of the day, and how to make the most out of it spiritually.",
      "image": "https://images.unsplash.com/photo-1612962263943-d73bdb7a5b4b",
      "user": { "name": "Samiha Al-Rahman", "pic": "https://randomuser.me/api/portraits/women/12.jpg" },
      "createdAt": "2023-07-04T14:00:00Z"
    }
  ];

  return (
    <div className="min-h-screen ">
      <Hero />
      {/* Navbar */}
      <nav className="top-0 z-50 border-b">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex items-center flex-shrink-0">
                <h1 className="text-xl font-bold">Blog</h1>
              </div>

              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-indigo-500">
                  <Home className="w-4 h-4 mr-2" />
                  Popular
                </a>
                <a className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300">
                  <BookOpen className="w-4 h-4 mr-2" />
                  All Blogs
                </a>
                <a className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300">
                  <Image className="w-4 h-4 mr-2" />
                  Gallery
                </a>
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="items-center hidden md:flex">
                  <div className="relative rounded-md shadow-sm">
                    <input
                      type="text"
                      className="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Search"
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center ml-3 -mr-2 sm:hidden">
                <button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blog.map((post, index) => (
            <article
              className="overflow-hidden rounded-lg shadow-sm"
              key={index}
            >
              <img
                src={`${post.image}`}
                alt="Hajj & Umrah"
                className="object-cover w-full h-48"
              />
              <div className="p-3">
                <Link
                  to={`/detail/${post._id}`}
                  className="mb-2 text-xl font-semibold"
                >
                  {post.title}
                </Link>
                <p className="mb-4 text-gray-600">{post.subtitle}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center">
                    <img
                      src={post.user.pic}
                      alt="user image"
                      className="w-8 h-8 mr-3 rounded-full"
                    />
                    <span className="text-sm text-gray-600">
                      {post.user.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {getReadTime(post.description)} min read
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Blog;
