import { getRequest } from "@/utilities/https";
import { objectToQueryString } from "@/utilities/query-creator";

export const get_all_genres = async () => {
  let queryUrl = objectToQueryString({
    skip: 0,
    count: 1000,
  });
  let response = await getRequest<{
    results: {
      GenreID: number;
      GenreName: string;
      ImageUrl: string | null;
    }[];
    total: number;
  }>(`/api/genre?` + queryUrl);
  return response.data;
};
export const get_genres = async (query: {
  skip: number;
  count: number;
  value?: string;
}) => {
  let queryUrl = objectToQueryString(query);
  let response = await getRequest<{
    results: {
      GenreID: number;
      GenreName: string;
      ImageUrl: string | null;
    }[];
    total: number;
  }>(`/api/genre?` + queryUrl);
  return response.data;
};

export const get_genre_by_id = async (id: number) => {
  let response = await getRequest<{
    genre: {
      GenreID: number;
      GenreName: string;
      ImageUrl: string | null;
    };
  }>(`/api/genre/` + id);
  return response.data;
};
