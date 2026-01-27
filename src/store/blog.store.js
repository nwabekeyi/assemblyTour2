import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import useAuthStore from "./store";

const useBlogStore = create((set, get) => ({
  blog: null,
  blogs: [],
  comments: [],
  replies: {},
  loading: false,
  error: null,

  setBlog: (blog) => set({ blog }),

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

  likeBlog: async (postId) => {
    const { blog } = get();
    const prevLiked = blog?.is_liked;
    try {
      const res = await axios.post(`/blogs/${postId}/like/`);
      set({
        blog: {
          ...blog,
          likes_count: res.data?.likes_count,
          is_liked: !prevLiked,
        },
      });
    } catch (error) {
      toast.error("Failed to update like");
      console.error(error);
    }
  },

  createComment: async ({ content, parent = null }) => {
    const { blog, getComments, getReplies, getSingleBlog } = get();  // <- get methods from store
    const { user } = useAuthStore.getState();
  
    if (!user) throw new Error("Login required");
    if (!blog) throw new Error("Blog must be loaded");
  
    try {
      await axios.post(`/blogs/${blog.id}/comments/post/`, {
        content,
        parent,
      });
  
      if (parent) {
        await getReplies(parent);
        await getSingleBlog(blog.slug);
      } else {
        await getSingleBlog(blog.slug);
        await getComments(blog.slug);
      }
    } catch (error) {
      console.error("Failed to create comment/reply", error);
      throw error;
    }
  },
  

  getComments: async (slug) => {
    try {
      const res = await axios.get(`/blogs/${slug}/comments/`);
      set({ comments: res.data || [] });
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  },
  createReply: async (commentId, content) => {
    const { getReplies } = get();
    const { user } = useAuthStore.getState();

    if (!user) throw new Error("Login required");
    if (!content.trim()) throw new Error("Reply cannot be empty");

    try {
      await axios.post(`/blogs/comments/${commentId}/reply/`, { content });
      toast.success("Reply posted");
      await getReplies(commentId); // refresh replies for this comment
    } catch (error) {
      console.error("Failed to create reply", error);
      throw error;
    }
  },

  getReplies: async (commentId) => {
    try {
      const res = await axios.get(`/blogs/comments/${commentId}/replies/`);
      set((state) => ({ replies: { ...state.replies, [commentId]: res.data || [] } }));
    } catch (error) {
      console.error("Failed to fetch replies", error);
    }
  },

  deleteComment: async (commentId) => {
    try {
      await axios.delete(`/blogs/comments/${commentId}/delete/`);
      const { blog, comments } = get();
      set({ comments: comments.filter((c) => c.id !== commentId) });
      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error(error);
    }
  },

  deleteReply: async (replyId, commentId) => {
    try {
      await axios.delete(`/blogs/replies/${replyId}/delete/`);
      const { replies } = get();
      set({ replies: { ...replies, [commentId]: replies[commentId].filter((r) => r.id !== replyId) } });
      toast.success("Reply deleted successfully");
    } catch (error) {
      toast.error("Failed to delete reply");
      console.error(error);
    }
  },

    // -----------------------------
  // EDIT COMMENT
  // -----------------------------
  editComment: async (commentId, content) => {
    if (!content.trim()) return toast.error("Cannot save empty content");

    try {
      const { blog, getComments } = get();
      await axios.patch(`/blogs/comments/${commentId}/edit/`, { content });
      toast.success("Comment updated");

      if (blog?.slug) getComments(blog.slug);
    } catch (error) {
      toast.error("Failed to update comment");
      console.error(error);
    }
  },

  // -----------------------------
  // EDIT REPLY
  // -----------------------------
  editReply: async (replyId, commentId, content) => {
    if (!content.trim()) return toast.error("Cannot save empty content");

    try {
      const { getReplies } = get();
      await axios.patch(`/blogs/replies/${replyId}/edit/`, { content });
      toast.success("Reply updated");

      // Refresh the replies for this comment
      await getReplies(commentId);
    } catch (error) {
      toast.error("Failed to update reply");
      console.error(error);
    }
  },

  reset: () => set({ blog: null, blogs: [], comments: [], replies: {}, error: null }),
}));

export default useBlogStore;
