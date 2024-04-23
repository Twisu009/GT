"use client";
import { getUserDetailsInLocalStorage } from "@/utilities/local-storage";
import React, { useEffect, useState } from "react";
import {
  CommentType,
  get_comments_by_game,
  post_comments_by_game,
} from "./comments.services";
import { Input } from "../ui/input";
import { UserDetails, get_users } from "../user/user.services";
import { GameProps } from "@/components/comment/comments.services";

const GameComments = ({ gameId }: GameProps) => {
  let user = getUserDetailsInLocalStorage();
  let [skip, setSkip] = useState(0);
  let [total, setTotal] = useState(10);
  let [comments, setComments] = useState<CommentType[]>([]);
  let [users, setUsers] = useState<UserDetails[]>([]);
  let [loading, setLoading] = useState(false);
  let [text, setText] = useState("");

  useEffect(() => {
    getInitialDetails();
  }, []);

  const getInitialDetails = async () => {
    let commentResponse = await get_comments_by_game({
      gameId,
      skip,
      count: 10,
      parentId: null,
    });
    let userIds = [...new Set(commentResponse.results.map((c) => c.UserID))];

    if (userIds.length > 0) {
      let userResponse = await get_users({
        skip: 0,
        count: userIds.length,
        userIds,
      });
      setUsers(userResponse.results);
    }
    setComments(commentResponse.results);
    setTotal(commentResponse.total);
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

      let userIds = [...new Set(uniqueComments.map((c) => c.UserID))];

      if (userIds.length > 0) {
        let userResponse = await get_users({
          skip: 0,
          count: userIds.length,
          userIds,
        });
        setUsers((prev) => [...prev, ...userResponse.results]);
      }
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
    <div
      style={{
        height: "500px",
      }}
      className="flex flex-col justify-center items-center w-full  "
    >
      {loading && <div className="mt-4">Loading..... please wait</div>}

      <div className="flex flex-col w-full max-w-md p-4 bg-white rounded-lg shadow-lg overflow-y-scroll overflow-x-hidden">
        <div className="flex w-full pb-3">
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
            className="flex-2 h-7 border w-full p-1 rounded-l-full"
          />
          <button
            className="flex-1 bg-custom-teal h-full text-custom-blue-green pl-1 pr-1 hover:text-custom-teal hover:bg-transparent w-full rounded-r-full font-semibold"
            onClick={pushComment}
          >
            Comment
          </button>
        </div>
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
                <div className="flex justify-center">
                  <div className="text-sm text-gray-500 ml-1 flex-grow ">
                    {users.find((u) => u.UserID === c.UserID)?.Username ?? ""}
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
        {total > skip + 10 && (
          <button
            className="bg-transparent text-custom-blue-green font-semibold py-2 px-4 border rounded transition-colors duration-300 hover:text-custom-teal hover:border-custom-blue-green flex items-center"
            onClick={loadMoreComments}
          >
            Load More...
          </button>
        )}
      </div>
    </div>
  );
};

export default GameComments;
