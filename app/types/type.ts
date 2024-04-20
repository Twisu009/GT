import { ChangeEvent, FormEvent } from "react";

export interface WishlistItem {
  id: number;
  name: string;
}

// Defining props for the GameForm component
export interface GameFormProps {
  title: string;
  description: string;
  releaseDate: string;
  mediaUrl: string;
  genres: number[];
  genreList: {
    GenreID: number;
    GenreName: string;
    ImageUrl: string | null;
  }[];
  onInputChange: (name: string, value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
