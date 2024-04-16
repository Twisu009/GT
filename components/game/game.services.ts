import { getRequest } from "@/utilities/https";

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
