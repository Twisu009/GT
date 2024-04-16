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
  imageUrl: string;
  onInputChange: (name: string, value: string) => void;
  onImageUpload: (imageData: Blob) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}
