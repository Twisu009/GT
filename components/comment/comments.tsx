"use client";
import { getUserDetailsInLocalStorage } from "@/utilities/local-storage";
import React, { useEffect, useState } from "react";
import {
  CommentType,
  get_comments_by_game,
  post_comments_by_game,
} from "./comments.services";
import { Input } from "../ui/input";
import { GameProps } from "@/components/comment/comments.services";
import ReusableSpinner from "../ui/spinner";

const GameComments = ({ gameId }: GameProps) => {
  let user = getUserDetailsInLocalStorage();
  let [skip, setSkip] = useState(0);
  let [total, setTotal] = useState(10);
  let [comments, setComments] = useState<CommentType[]>([]);
  let [loading, setLoading] = useState(false);
  let [text, setText] = useState("");

  useEffect(() => {
    getInitialComments();
  }, []);

  const getInitialComments = async () => {
    let response = await get_comments_by_game({
      gameId,
      skip,
      count: 10,
      parentId: null,
    });
    setComments(response.results);
    setTotal(response.total);
    setLoading(false);
  };

  const loadMoreComments = async () => {
    if (total > skip + 10) {
      setLoading(true);

      let response = await get_comments_by_game({
        gameId,
        skip: skip + 10,
        count: 10,
        parentId: null,
      });
      let uniqueComments = removeRepeatingIds([
        ...comments,
        ...response.results,
      ]);
      setComments(uniqueComments);
      setSkip(skip + 10);
      setLoading(false);
    }
  };
  function removeRepeatingIds(array: CommentType[]) {
    let seenIds = new Set();
    return array.filter((obj) => {
      if (seenIds.has(obj.CommentID)) {
        return false;
      } else {
        seenIds.add(obj.CommentID);
        return true;
      }
    });
  }

  const pushComment = async () => {
    setLoading(true);
    if (user) {
      let commentDetails = {
        text,
        userId: user.UserID,
        // parentId: ,
        gameId,
      };
      let response = await post_comments_by_game(commentDetails);
      setComments([response.comment, ...comments]);
      setText("");
    } else {
      alert("Must be logged in!");
    }
    setLoading(false);
  };

  return (
    <div className="w-auto bg-white rounded-lg border p-2 my-10 mx-80">
      <h3 className="font-bold">Discussion</h3>
      {loading && <ReusableSpinner />}
      <div className="mt-10 flex flex-col">
        <Input
          type="text"
          placeholder="Leave a comment..."
          value={text}
          onChange={(v) => setText(v.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              pushComment();
            }
          }}
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-transparent"
        />

        <div className="flex justify-center">
          <button
            className="mt-2 px-4 py-3 bg-custom-blue-green text-custom-teal font-semibold py-2 px-4 border border-custom-blue-green rounded transition-colors duration-300 hover:bg-transparent hover:text-custom-blue-green hover:border-custom-teal"
            onClick={pushComment}
          >
            Post
          </button>
        </div>
      </div>

      <div className="mt-8">
        {comments.map((c) => {
          return (
            <div
              key={c.CommentID}
              className="w-full border-b border-gray-200 mb-4 pb-4"
            >
              <div className="flex items-center mb-2">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 flex items-center justify-center bg-gray-300 rounded-full text-gray-600 font-bold">
                    {c.UserID}
                  </div>
                </div>
                <div className="flex w-full justify-end">
                  <span className="text-sm text-gray-500 ml-1 flex-grow text-right">
                    {new Date(c.CommentDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>
              </div>
              <p className="ml-3 text-sm">{c.CommentText}</p>
            </div>
          );
        })}
      </div>

      {total > skip + 10 && (
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={loadMoreComments}
          >
            Load More Comments
          </button>
        </div>
      )}
    </div>
  );
};

export default GameComments;
