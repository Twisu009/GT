"use client";

import { useState } from "react";

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="mb-2">
              {comment}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <textarea
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          rows={3}
          placeholder="Add a comment..."
          value={newComment}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <div className="mt-2 flex justify-end">
        <button
          className="bg-transparent text-teal-700 font-semibold py-2 px-4 border border-teal-400 rounded transition-colors duration-300 hover:bg-cyan-950 hover:text-white hover:border-transparent"
          onClick={handleAddComment}
        >
          <span style={{ color: "#6bd3b6" }}>Post Comment </span>
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
