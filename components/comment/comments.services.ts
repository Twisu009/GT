import { getRequest, postRequest } from "@/utilities/https";
import { objectToQueryString } from "@/utilities/query-creator";

interface CommentQuery {
  gameId: number;
  skip: number;
  count: number;
  parentId: number | null;
}
export interface CommentType {
  CommentID: number;
  CommentText: string;
  CommentDate: string;
  ParentID: number | null;
  GameID: number;
  UserID: number;
}
export const get_comments_by_game = async (query: CommentQuery) => {
  let queryUrl = objectToQueryString(query);
  let response = await getRequest<{
    results: CommentType[];
    total: number;
  }>(`/api/comment/${query.gameId}?` + queryUrl);
  return response.data;
};

export const post_comments_by_game = async (commentDetails: {
  text: string;
  userId: number;
  gameId: number;
  parentId?: number;
}) => {
  let response = await postRequest<{
    comment: {
      CommentID: number;
      CommentText: string;
      CommentDate: string;
      ParentID: number | null;
      GameID: number;
      UserID: number;
    };
  }>(`/api/comment/protected`, commentDetails);
  return response.data;
};

export interface GameProps {
  gameId: number;
}
