import { useState, useEffect } from "react";
import axiosInstance from "../lib/axios"; // adjust path as needed

/**
 * Custom hook to fetch homepage content
 * Returns hero slides, experience section, and 3 most recent blogs
 */
export const useHomeContent = () => {
  const [heroSlides, setHeroSlides] = useState([]);
  const [experienceSection, setExperienceSection] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentSacredSites, setRecentSacredSites] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const [faqs, setFaqs] = useState([]);


  useEffect(() => {
    const fetchHomeContent = async () => {
      setLoading(true);
      try {
        // 1️⃣ Fetch home content (hero + experience)
        const homeRes = await axiosInstance.get("/home-content/");
        const homeData = homeRes.data || {};
        setHeroSlides(homeData.hero_slides || []);
        setExperienceSection(homeData.experience_section || null);

        // 2️⃣ Fetch 3 most recent blogs
        const blogRes = await axiosInstance.get("/blogs/", {
          params: { page_size: 3 } // using pagination limit
        });
        const blogData = blogRes.data?.data || [];
        setRecentBlogs(blogData);

           /**3 3 most recent sacred sites */
           const sacredRes = await axiosInstance.get("/sacred-sites/", {
            params: { page_size: 3 }
          });
  
          // because backend wraps with api_response + pagination
          const sacredSites =
            sacredRes.data?.data || [];
  
          setRecentSacredSites(sacredSites);

          const packageRes = await axiosInstance.get("/packages/");
          setAllPackages(packageRes.data?.data || []);

          const faqs = await axiosInstance.get("/faqs/");
          setFaqs(faqs.data || []);

        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch home content");
        setHeroSlides([]);
        setExperienceSection(null);
        setRecentBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeContent();
  }, []);

  return { heroSlides, experienceSection, recentBlogs, recentSacredSites, allPackages, faqs, loading, error };
};
