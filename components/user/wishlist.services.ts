import { getRequest, postRequest } from "@/utilities/https";
import { objectToQueryString } from "@/utilities/query-creator";

export interface Wishlists {
  WishlistID: number;
  GameID: number;
  UserID: number;
  game: Game;
}

export interface Game {
  GameID: number;
  Title: string;
  Description: string;
  ReleaseDate: string;
  ImageUrl: string;
  UserID: number;
}

export interface RemoveWishlist {
  WishlistID: number;
  GameID: number;
  UserID: number;
}

export const get_user_wishlist = async (query: {
  skip: number;
  count: number;
  userId: number;
  value: string;
}) => {
  let queryUrl = objectToQueryString(query);
  let response = await getRequest<{
    results: Wishlists[];
    total: number;
  }>(`/api/wishlist/protected?` + queryUrl);
  return response.data;
};

export const remove_user_wishlist = async (wishlistId: number) => {
  let response = await postRequest<{
    wishlist: RemoveWishlist;
  }>(`/api/wishlist/protected/remove`, {
    wishlistId,
  });
  return response.data;
};
