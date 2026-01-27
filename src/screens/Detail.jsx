import { Heart, Edit, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import useBlogStore from "../store/blog.store";
import useAuthStore from "../store/store";
import Loading from "../components/Spinner/Loading";
import Modal from "../components/sharedComponents/Modal";

function Detail() {
  const { id } = useParams(); // slug

  const {
    blog,
    comments,
    replies,
    getSingleBlog,
    likeBlog,
    createComment,
    editComment,
    deleteComment,
    getComments,
    getReplies,
    createReply,
    editReply,
    deleteReply,
  } = useBlogStore();

  const { user, login, loading: authLoading } = useAuthStore();

  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Edit states
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editingReplyId, setEditingReplyId] = useState(null);

  const isAuthenticated = !!user;

  const requireLogin = (actionType) => {
    if (!isAuthenticated) {
      setPendingAction(actionType);
      setShowLoginModal(true);
      return false;
    }
    return true;
  };

  useEffect(() => {
    getSingleBlog(id);
  }, [id, getSingleBlog]);

  useEffect(() => {
    if (blog?.slug) getComments(blog.slug);
  }, [blog?.slug, getComments]);

  const handleLike = async () => {
    if (!requireLogin("like")) return;
    try {
      await likeBlog(blog.id);
      toast.success(blog.is_liked ? "Like removed" : "Liked!");
    } catch (err) {
      toast.error("Failed to update like");
    }
  };

  const handlePostComment = async () => {
    if (!requireLogin("comment")) return;
    if (!newComment.trim()) return toast.error("Please write something");

    try {
      await createComment({ content: newComment });
      setNewComment("");
      toast.success("Comment posted");
      if (blog?.slug) getComments(blog.slug);
    } catch (err) {
      toast.error("Failed to post comment");
    }
  };

  const handlePostReply = async (commentId) => {
    if (!requireLogin("reply")) return;
    const text = replyContent[commentId]?.trim();
    if (!text) return toast.error("Reply cannot be empty");

    try {
      await createReply(commentId, text);
      setReplyContent((prev) => ({ ...prev, [commentId]: "" }));
      toast.success("Reply posted");
      getReplies(commentId);
    } catch (err) {
      toast.error("Failed to post reply");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await deleteComment(commentId);
      toast.success("Comment deleted");
      if (blog?.slug) getComments(blog.slug);
    } catch (err) {
      toast.error("Could not delete comment");
      console.error(err);
    }
  };

  const handleDeleteReply = async (replyId, commentId) => {
    if (!window.confirm("Delete this reply?")) return;
    try {
      await deleteReply(replyId, commentId);
      toast.success("Reply deleted");
      getReplies(commentId);
    } catch (err) {
      toast.error("Could not delete reply");
      console.error(err);
    }
  };

  const handleStartEdit = (id, content, isReply = false) => {
    if (isReply) {
      setEditingReplyId(id);
    } else {
      setEditingId(id);
      setEditContent(content);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingReplyId(null);
    setEditContent("");
  };

  const handleSaveEdit = async (id, isReply = false, commentId = null) => {
    if (!editContent.trim()) return toast.error("Cannot save empty content");
    try {
      if (isReply && commentId) {
        await editReply(id, commentId, editContent);
        getReplies(commentId);
      } else {
        await editComment(id, editContent);
        if (blog?.slug) getComments(blog.slug);
      }
      toast.success("Updated successfully");
      handleCancelEdit();
    } catch (err) {
      toast.error("Failed to update");
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const success = await login({ username, password });
      if (success) {
        setShowLoginModal(false);
        setUsername("");
        setPassword("");
        toast.success("Logged in");
      } else {
        toast.error("Login failed");
      }
    } catch (err) {
      toast.error("Login error");
    }
  };

  if (!blog) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Cover */}
        <img
          src={blog.cover_image_url}
          alt={blog.title}
          className="w-full h-64 md:h-80 object-cover rounded-xl shadow mb-10"
        />

        {/* Title & meta */}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center gap-3 text-gray-600 mb-10">
          {blog.author_image_url ? (
            <img
              src={blog.author_image_url}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-medium">
              {blog.author_name?.[0]?.toUpperCase()}
            </div>
          )}
          <div>
            <div className="font-medium">{blog.author_name}</div>
            <div className="text-sm">
              {blog.read_time || "?"} min read • {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : ""}
            </div>
          </div>
        </div>

        {/* Like area */}
        <div className="flex items-center gap-6 mb-10">
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 transition-colors ${
              blog.is_liked
                ? "text-red-600 hover:text-red-700"
                : "text-gray-600 hover:text-red-600"
            }`}
          >
            <Heart
              className={`w-7 h-7 ${blog.is_liked ? "fill-current" : ""}`}
            />
            <span className="font-medium text-lg">{blog.likes_count || 0}</span>
          </button>
        </div>

        {/* Content */}
        <div
          className="prose prose-lg max-w-none mb-16"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Comments */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Comments ({blog.comments_count || comments?.length || 0})</h2>

          {/* New comment */}
          <div className="mb-10">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[110px]"
            />
            <div className="mt-3">
              <button
                onClick={handlePostComment}
                className="px-6 py-2.5 bg-emerald-700 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                disabled={!newComment.trim()}
              >
                Post comment
              </button>
            </div>
          </div>

          {/* List of comments */}
          {comments?.length > 0 ? (
            <div className="space-y-8">
              {comments.map((c) => (
                <div key={c.id} className="bg-white p-5 rounded-lg shadow-sm border">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                        {c.user_name?.[0]?.toUpperCase() || "?"}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="font-medium">{c.user_name}</div>
                      <div className="text-sm text-gray-500 mt-0.5">
                        {new Date(c.created_at).toLocaleString()}
                      </div>

                      {/* Edit comment */}
                      {editingId === c.id ? (
                        <div className="mt-3">
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full p-3 border rounded-lg min-h-[90px]"
                          />
                          <div className="mt-3 flex gap-3">
                            <button
                              onClick={() => handleSaveEdit(c.id, false)}
                              className="px-4 py-1.5 bg-green-600 text-white rounded hover:bg-emerald-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="px-4 py-1.5 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="mt-2 text-gray-800 whitespace-pre-wrap">{c.content}</p>
                      )}

                      {/* Comment actions */}
                      {user && c.user_name === user.username && editingId !== c.id && (
                        <div className="mt-2 flex gap-4 text-sm">
                          <button
                            onClick={() => handleStartEdit(c.id, c.content)}
                            className="text-emerald-700 hover:underline inline-flex items-center gap-1"
                          >
                            <Edit size={16} /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteComment(c.id)}
                            className="text-red-600 hover:underline inline-flex items-center gap-1"
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      )}

                      {/* Replies */}
                      {replies[c.id]?.length > 0 && (
                        <div className="mt-5 pl-6 border-l-2 border-gray-200 space-y-4">
                          {replies[c.id].map((r) => (
                            <div key={r.id}>
                              <div className="font-medium text-sm">{r.user_name}</div>
                              <div className="text-xs text-gray-500">{new Date(r.created_at).toLocaleString()}</div>
                              {editingReplyId === r.id ? (
                                <div className="mt-1">
                                  <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                  />
                                  <div className="mt-1 flex gap-2">
                                    <button onClick={() => handleSaveEdit(r.id, true, c.id)} className="px-2 py-1 bg-green-600 text-white rounded">Save</button>
                                    <button onClick={handleCancelEdit} className="px-2 py-1 bg-gray-200 rounded">Cancel</button>
                                  </div>
                                </div>
                              ) : (
                                <p className="mt-1 text-gray-700 text-sm">{r.content}</p>
                              )}

                              {user && r.user_name === user.username && editingReplyId !== r.id && (
                                <div className="mt-1 flex gap-4 text-xs">
                                  <button onClick={() => handleStartEdit(r.id, r.content, true)} className="text-indigo-600 hover:underline">Edit</button>
                                  <button onClick={() => handleDeleteReply(r.id, c.id)} className="text-red-600 hover:underline">Delete</button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply input */}
                      <div className="mt-4">
                        <textarea
                          value={replyContent[c.id] || ""}
                          onChange={(e) =>
                            setReplyContent((prev) => ({ ...prev, [c.id]: e.target.value }))
                          }
                          placeholder="Reply to this comment..."
                          className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-400 min-h-[70px]"
                        />
                        <button
                          onClick={() => handlePostReply(c.id)}
                          className="mt-2 px-5 py-1.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm disabled:opacity-50"
                          disabled={!replyContent[c.id]?.trim()}
                        >
                          Reply
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-10">No comments yet. Be the first!</p>
          )}
        </section>
      </main>

      {/* Login modal */}
      <Modal
        isOpen={showLoginModal}
        onClose={() => { setShowLoginModal(false); setPendingAction(null); }}
      >
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">Sign in to continue</h3>
          <p className="text-gray-600 mb-6">You need to be logged in to like or comment.</p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex gap-4 pt-3">
              <button type="button" onClick={() => setShowLoginModal(false)} className="flex-1 py-2.5 bg-gray-200 rounded-lg hover:bg-gray-300">Cancel</button>
              <button type="submit" disabled={authLoading} className="flex-1 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-60">
                {authLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Detail;
