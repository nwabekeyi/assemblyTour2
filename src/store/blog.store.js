import { create } from "zustand";
import axiosInstance from "../lib/axios";
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

  // -----------------------------
  // FETCH BLOGS
  // -----------------------------
  getAllBlogs: async (params = {}) => {
    set({ loading: true });
    const res = await axiosInstance.get("/blogs/", { params, useAuth: false });
    set({ blogs: res.data?.data || [], loading: false });
  },

  getSingleBlog: async (slug) => {
    set({ loading: true });
    const res = await axiosInstance.get(`/blogs/${slug}/`, { useAuth: false });
    set({ blog: res.data || null, loading: false });
  },

  likeBlog: async (postId) => {
    const { blog } = get();
    const prevLiked = blog?.is_liked;

    const res = await axiosInstance.post(`/blogs/${postId}/like/`, { useAuth: true });
    set({
      blog: {
        ...blog,
        likes_count: res.data?.likes_count,
        is_liked: !prevLiked,
      },
    });
  },

  createComment: async ({ content, parent = null }) => {
    const { blog, getComments, getReplies, getSingleBlog } = get();
    const { user } = useAuthStore.getState();

    if (!user) throw new Error("Login required");
    if (!blog) throw new Error("Blog must be loaded");

    await axiosInstance.post(`/blogs/${blog.id}/comments/post/`, {
      content,
      parent,
      useAuth: true
    });

    if (parent) {
      await getReplies(parent);
      await getSingleBlog(blog.slug);
    } else {
      await getSingleBlog(blog.slug);
      await getComments(blog.slug);
    }
  },

  getComments: async (slug) => {
    const res = await axiosInstance.get(`/blogs/${slug}/comments/`, { useAuth: false });
    set({ comments: res.data || [] });
  },

  createReply: async (commentId, content) => {
    const { getReplies } = get();
    const { user } = useAuthStore.getState();

    if (!user) throw new Error("Login required");
    if (!content.trim()) throw new Error("Reply cannot be empty");

    await axiosInstance.post(`/blogs/comments/${commentId}/reply/`, { content, useAuth:true });
    toast.success("Reply posted");
    await getReplies(commentId);
  },

  getReplies: async (commentId) => {
    const res = await axiosInstance.get(`/blogs/comments/${commentId}/replies/`, { useAuth: false });
    set((state) => ({ replies: { ...state.replies, [commentId]: res.data || [] } }));
  },

  deleteComment: async (commentId) => {
    await axiosInstance.delete(`/blogs/comments/${commentId}/delete/`, { useAuth: true });
    const { comments } = get();
    set({ comments: comments.filter((c) => c.id !== commentId) });
    toast.success("Comment deleted successfully");
  },

  deleteReply: async (replyId, commentId) => {
    await axiosInstance.delete(`/blogs/replies/${replyId}/delete/`, { useAuth: true });
    const { replies } = get();
    set({ replies: { ...replies, [commentId]: replies[commentId].filter((r) => r.id !== replyId) } });
    toast.success("Reply deleted successfully");
  },

  editComment: async (commentId, content) => {
    if (!content.trim()) return toast.error("Cannot save empty content");

    const { blog, getComments } = get();
    await axiosInstance.patch(`/blogs/comments/${commentId}/edit/`, { content, useAuth:true });
    toast.success("Comment updated");

    if (blog?.slug) getComments(blog.slug);
  },

  editReply: async (replyId, commentId, content) => {
    if (!content.trim()) return toast.error("Cannot save empty content");

    const { getReplies } = get();
    await axiosInstance.patch(`/blogs/replies/${replyId}/edit/`, { content, useAuth: true });
    toast.success("Reply updated");

    await getReplies(commentId);
  },

  reset: () => set({ blog: null, blogs: [], comments: [], replies: {}, error: null }),
}));

export default useBlogStore;
