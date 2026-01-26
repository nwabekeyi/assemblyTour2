import { create } from "zustand";
import axios from "../lib/axios"; // Axios instance
import { toast } from "react-hot-toast";

const useBlogStore = create((set, get) => ({
  blog: null, // single blog
  blogs: [], // list of blogs
  comment: [],
  loading: false,
  error: null,
  numberOfLikes: 0,

  // Set a single blog manually
  setBlog: (blog) => set({ blog }),

  // Fetch all blogs
  getAllBlogs: async (params = {}) => {
    set({ loading: true });
    try {
      const res = await axios.get("/blogs/", { params });
      set({ blogs: res.data?.data || [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message || "Failed to fetch blogs");
    }
  },

  // Fetch single blog by slug
  getSingleBlog: async (slug) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/blogs/${slug}/`);
      set({ blog: res.data || null, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error(error.message || "Failed to fetch blog");
    }
  },

  // Like/unlike a blog
  likeBlog: async (postId) => {
    try {
      const res = await axios.post(`/blogs/${postId}/like/`);
      // Update likes count in state
      const updatedBlog = { ...get().blog, likeCount: res.data?.like_count };
      set({ blog: updatedBlog, numberOfLikes: res.data?.like_count });
    } catch (error) {
      toast.error("Failed to like the blog");
      console.error(error);
    }
  },

  // Create a comment on a blog
  createComment: async (content, blogId, userId, parentId = null) => {
    try {
      const payload = { content };
      if (parentId) payload.parent = parentId;

      const res = await axios.post(`/blogs/${blogId}/comment/`, payload);
      // Refresh comments after creation
      await get().getComment(blogId);
      return res.data;
    } catch (error) {
      console.error("Error creating comment:", error.response || error);
      throw error;
    }
  },

  // Get comments for a blog
  getComment: async (blogId) => {
    try {
      const res = await axios.get(`/blogs/${blogId}/comments/`);
      set({ comment: res.data?.data || [] });
    } catch (error) {
      set({ error: error.message });
      console.error(error);
    }
  },

  // Optional: reset store state
  reset: () => set({ blog: null, blogs: [], comment: [], numberOfLikes: 0, error: null }),
}));

export default useBlogStore;
