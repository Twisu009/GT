import { getRequest } from "@/utilities/https";
import { objectToQueryString } from "@/utilities/query-creator";

export interface Game {
  GameID: number;
  Title: string;
  Description: string;
  ReleaseDate: string;
  ImageUrl: string;
  UserID: number;
  GameGenre: GameGenre[];
}

export interface GameGenre {
  GameID: number;
  GenreID: number;
  genre: Genre;
}

export interface Genre {
  GenreID: number;
  GenreName: string;
  ImageUrl: any;
}

export const get_game_by_id = async (gameId: number) => {
  let response = await getRequest<Game>(`/api/game/${gameId}`);
  return response.data;
};

export const get_user_games = async (query: {
  skip: number;
  count: number;
  userIds: number[];
  value?: string;
}) => {
  let queryUrl = objectToQueryString(query);
  let response = await getRequest<{
    results: Game[];
    total: number;
  }>(`/api/game?` + queryUrl);
  return response.data;
};

export const get_games_by_genre_id = async (query: {
  genreIds: number[];
  skip: number;
  count: number;
  value?: string;
}) => {
  let queryUrl = objectToQueryString(query);
  let response = await getRequest<{
    results: Game[];
    total: number;
  }>(`/api/game?` + queryUrl);
  return response.data;
};

export const get_latest_games = async () => {
  let response = await getRequest<{
    results: Game[];
  }>(`/api/game/new-releases`);
  return response.data;
};
