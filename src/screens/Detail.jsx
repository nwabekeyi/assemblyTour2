import {
  Heart,
} from "lucide-react";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

import useBlogStore from "../store/blog.store";
import { useParams } from "react-router-dom";
import useAuthStore from "../store/store";
import Loading from "../components/Spinner/Loading";

function Detail() {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [replyContent, setReplyContent] = useState({});
  const { id } = useParams();
  const { blog, comment, getSingleBlog, likeBlog, createComment, getComment } = useBlogStore();
  const { user } = useAuthStore();

  // Fetch blog and comments on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getSingleBlog(id);
        await getComment(id);
      } catch (error) {
        console.error("Failed to fetch blog or comments:", error);
      }
    };
    fetchData();
  }, [id]);

  // Update likes state when blog changes
  useEffect(() => {
    if (blog) {
      setLikes(blog.likeCount || 0);
      const userHasLiked = blog.likes?.some((like) => like.user === user?._id);
      setIsLiked(userHasLiked);
    }
  }, [blog, user]);

  // Handle blog like
  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like and comment on blogs", { id: "login" });
      return;
    }

    const previousLiked = isLiked;
    const previousLikes = likes;

    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);

    try {
      await likeBlog(user.id, blog._id);
    } catch (error) {
      setIsLiked(previousLiked);
      setLikes(previousLikes);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // Add new comment
  const handleAddComment = async () => {
    if (!user) {
      toast.error("Please login to add comments", { id: "login" });
      return;
    }

    if (!newComment.trim()) {
      toast.error("Comment cannot be empty.");
      return;
    }

    try {
      await createComment(newComment, blog._id, user._id);
      setNewComment(""); // Clear input
      toast.success("Comment added successfully");
      await getComment(id); // Refresh comments
    } catch (error) {
      toast.error("Failed to add comment. Please try again.");
    }
  };

  // Reply to a comment
  const handleReply = async (commentId) => {
    if (!user) {
      toast.error("Please login to reply to comments", { id: "login" });
      return;
    }

    const replyText = replyContent[commentId];
    if (!replyText || !replyText.trim()) {
      toast.error("Reply cannot be empty.");
      return;
    }

    try {
      await createComment(replyText, blog._id, user._id, commentId); // Pass parent comment id
      setReplyContent((prev) => ({ ...prev, [commentId]: "" })); // Clear reply input
      await getComment(id); // Refresh comments and replies

      // Scroll to the comment
      const element = document.getElementById(`comment-${commentId}`);
      if (element) element.scrollIntoView({ behavior: "smooth" });
      toast.success("Reply added successfully");
    } catch (error) {
      toast.error("Failed to add reply. Please try again.");
    }
  };

  if (!blog) return <Loading />;

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Blog Cover */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-72 object-cover rounded-lg mb-8"
        />

        {/* Title & Author */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center text-gray-600">
            <img
              src={blog.author_image_url || blog.image}
              alt={blog.author_name}
              className="h-12 w-12 rounded-full mr-4"
            />
            <div>
              <div className="text-sm">
                <span>{blog.author_name}</span>
                <span className="mx-2">•</span>
                <span>{blog.read_time || 5} min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Like Button */}
        <div className="mt-8 flex items-center space-x-4">
          <button
            onClick={handleLike}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
          >
            <Heart className={`h-6 w-6 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            <span className="font-medium">{likes} likes</span>
          </button>
        </div>

        {/* Blog Content */}
        <div className="mt-8 prose max-w-none">
          <p>{blog.content}</p>
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6">Comments</h3>

          {/* New Comment */}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            rows="3"
            placeholder="Add a comment..."
          />
          <button
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            onClick={handleAddComment}
          >
            Post Comment
          </button>

          {/* Existing Comments */}
          <div className="space-y-6 mt-6">
            {Array.isArray(comment) && comment.length > 0 ? (
              comment.map((c) => (
                <div id={`comment-${c._id}`} key={c._id} className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <img
                      src={c.user.pic}
                      alt={c.user.name}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{c.user.name}</h4>
                      <p className="mt-1 text-gray-600">{c.content}</p>
                    </div>
                  </div>

                  {/* Reply Input */}
                  <textarea
                    value={replyContent[c._id] || ""}
                    onChange={(e) =>
                      setReplyContent((prev) => ({
                        ...prev,
                        [c._id]: e.target.value,
                      }))
                    }
                    className="mt-4 w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    rows="2"
                    placeholder="Reply to this comment..."
                  />
                  <button
                    className="mt-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    onClick={() => handleReply(c._id)}
                  >
                    Reply
                  </button>

                  {/* Render Replies */}
                  {Array.isArray(c.replies) && c.replies.length > 0 && (
                    <div className="mt-4 ml-12 space-y-4">
                      {c.replies.map((reply) => (
                        <div key={reply._id} className="flex items-start space-x-4 bg-gray-50 p-3 rounded-lg">
                          <img
                            src={reply.user.pic}
                            alt={reply.user.name}
                            className="h-8 w-8 rounded-full"
                          />
                          <div>
                            <h5 className="font-medium text-gray-700">{reply.user.name}</h5>
                            <p className="text-gray-600">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">No comments yet.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Detail;
